import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login'
import Bugsnag from '@bugsnag/js'
import jwt_decode from 'jwt-decode'
import axios from 'axios'
import { useAuth } from '../../context/auth-context'
import styles from './login.component.css'
import logo from '../../assets/img/logo/antara-logo.png'
import googleLogo from '../../assets/img/vector/google.png'
import storage from '../../helpers/secure-storage'
import keys from '../../constants/storage'
import analytics from '../../helpers/segment'

const Login = () => {
  const history = useHistory()
  const { setCurrentUser, isLoggedIn } = useAuth()
  const [error, setError] = React.useState<string>('')
  const [isLoggingIn, setLoggingIn] = React.useState<boolean>(false)

  useEffect(() => {
    if (isLoggedIn()) {
      history.push('/member')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const failureSignIn = (message: any) => {
    setError(message.error)
    setLoggingIn(false)
    analytics.track('User LoginFailed', {
      failure_reason: message.error,
    })
  }

  const getRefreshTokenFromNodeProxy = async (code: string) => {
    const tokens = await axios({
      url: `${process.env.NODE_PROXY_URL}/auth`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      data: { code },
    }).then(({ data }) => data)
    return tokens
  }

  const successfulSignIn = async (response: any) => {
    if (!response.code) {
      return
    }
    // pass one time code from google to node proxy to generate
    // access token and refresh token for authentication
    const authToken = await getRefreshTokenFromNodeProxy(response.code)

    if (authToken && authToken.refresh_token) {
      storage.set(keys.REFRESH_TOKEN, authToken.refresh_token)
    }

    if (authToken && authToken.id_token) {
      const userObj = jwt_decode(authToken.id_token)
      setCurrentUser(userObj)
      storage.set(keys.USER, JSON.stringify({ ...authToken, ...userObj }))
      if (userObj) {
        analytics.identify(userObj.email)
        analytics.track('User LoggedIn')
        Bugsnag.setUser(
          authToken.id_token,
          userObj.email,
          `${userObj.given_name} ${userObj.family_name}`
        )
      }
    }
    if (history?.location?.state?.from?.pathname !== '/login') {
      history.push(history?.location?.state?.from)
    }
    history.push('/member')
  }

  React.useEffect(() => {
    document.title = `Scribe: Login`
  }, [])

  return (
    <div className={styles.container}>
      <div className={` ${styles.loginCard}`}>
        <div>
          <img src={logo} className={styles.logo} alt="Antara Logo" />
        </div>
        <div>
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID || ''}
            render={(renderProps) => (
              <button
                className="btn btn-secondary"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img
                  src={googleLogo}
                  className={styles.googleLogo}
                  alt="Google logo"
                  width="16px"
                />
                <span>
                  {isLoggingIn
                    ? 'Logging you in...'
                    : 'Login with your Antara Email'}
                </span>
              </button>
            )}
            onSuccess={successfulSignIn}
            onFailure={failureSignIn}
            onRequest={() => setLoggingIn(true)}
            cookiePolicy="single_host_origin"
            disabled={isLoggingIn}
            accessType="offline"
            responseType="code"
            prompt="consent"
            isSignedIn
          />
        </div>
        <p
          className="text-danger"
          style={{ padding: '10px', fontFamily: 'Rubik' }}
        >
          {error && `An error occured: ${error.split('_').join(' ')}`}
        </p>
      </div>
    </div>
  )
}

export default Login
