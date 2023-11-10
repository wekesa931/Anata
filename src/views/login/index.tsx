import React, { useEffect } from 'react'
import logo from 'src/assets/img/logo/antara-logo.png'
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { useNavigate, useLocation } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import * as Sentry from '@sentry/react'
import { useAuth } from 'src/context/auth'
import storage from 'src/storage/secure-storage'
import keys from 'src/config/constants'
import analytics from 'src/config/analytics'
import { GoogleSigninButton } from './components/google-signin'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  const { setCurrentUser, isLoggedIn } = useAuth()
  const [error, setError] = React.useState<string>('')
  const [isLoggingIn, setLoggingIn] = React.useState<boolean>(false)

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(-1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    document.title = `Scribe: Login`
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
      url: `${process.env.API_URL}/airtable/auth`,
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
    setLoggingIn(true)
    // pass one time code from google to node proxy to generate
    // access token and refresh token for authentication
    const authToken = await getRefreshTokenFromNodeProxy(response.code)

    if (authToken && authToken.refresh_token) {
      storage.set(keys.REFRESH_TOKEN, authToken.refresh_token)
    }

    if (authToken && authToken.id_token) {
      const userObj: any = jwt_decode(authToken.id_token)
      // @ts-ignore
      setCurrentUser(userObj)
      storage.set(keys.USER, JSON.stringify({ ...authToken, ...userObj }))
      if (userObj) {
        analytics.identify(userObj.email)
        analytics.track('User LoggedIn')
        Sentry.setUser({
          email: userObj?.email,
          name: `${userObj.given_name} ${userObj.family_name}`,
        })
        setLoggingIn(false)
      }

      const redirectUrl = location?.state?.from || '/member'
      if (
        redirectUrl &&
        redirectUrl !== '/login' &&
        redirectUrl !== '/user-not-found'
      ) {
        navigate(redirectUrl)
      } else {
        navigate('/member')
      }
    } else {
      setError('Failed to authenticate user, please try again')
      setLoggingIn(false)
    }
  }

  const login = useGoogleLogin({
    onSuccess: successfulSignIn,
    onError: failureSignIn,
    flow: 'auth-code',
    ux_mode: 'popup',
  })

  return (
    <div className="flex flex-col items-center justify-center text-center min-h-full font-rubik">
      <div className="w-[350px] h-[250px] bg-white flex flex-col justify-evenly items-center shadow-md rounded-xl">
        <div>
          <img src={logo} className="h-[100px]" alt="Antara Logo" />
        </div>
        <div>
          <GoogleSigninButton onClick={() => login()} loading={isLoggingIn} />
        </div>
        <p className="text-red-100 p-1.5">
          {error && `An error occured: ${error.split('_').join(' ')}`}
        </p>
      </div>
    </div>
  )
}

export default Login
