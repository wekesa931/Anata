import React from 'react'
import { useHistory } from 'react-router-dom'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { useAuth } from '../../context/auth-context'
import styles from './login.component.css'
import logo from '../../assets/img/logo/antara-logo.png'
import googleLogo from '../../assets/img/vector/google.png'

const Login = () => {
  const history = useHistory()
  const { setCurrentUser } = useAuth()
  const [error, setError] = React.useState<string>('')
  const [isLoggingIn, setLoggingIn] = React.useState<boolean>(false)

  const failureSignIn = (message: any) => {
    setError(message.error)
    setLoggingIn(false)
  }

  const successfulSignIn = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    sessionStorage.setItem('user', JSON.stringify(response))
    setCurrentUser(response)
    if (
      history &&
      history.location &&
      history.location.state &&
      history.location.state.from
    ) {
      return history.push(history.location.state.from)
    }
    return history.push('/member')
  }

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
