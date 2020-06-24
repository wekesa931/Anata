import React from 'react'
import GoogleLogin, {
  GoogleLoginResponse,
  GoogleLoginResponseOffline,
} from 'react-google-login'
import { useHistory } from 'react-router-dom'
import styles from './login.component.css'
import logo from '../../assets/img/logo/antara-logo.png'
import { useAuth } from '../../context/auth-context'

const Login = (props: any) => {
  const history = useHistory()
  const { setCurrentUser } = useAuth()
  const [error, setError] = React.useState<string>('')
  const [isLoggingIn, setLoggingIn] = React.useState<boolean>(false)

  const failureSignIn = (message: any) => {
    setError(message.error)
    props.setLoggingIn(false)
  }

  const successfulSignIn = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    sessionStorage.setItem('user', JSON.stringify(response))
    setCurrentUser(response)
    history.push('/')
  }

  return (
    <div className={styles.container}>
      <div className={`card ${styles.loginCard}`}>
        <div>
          <img src={logo} className={styles.logo} alt="Antara Logo" />
        </div>
        <div>
          <GoogleLogin
            clientId={process.env.GOOGLE_CLIENT_ID || ''}
            buttonText={
              isLoggingIn ? 'Logging you in...' : 'Login with your Antara Email'
            }
            onSuccess={successfulSignIn}
            onFailure={failureSignIn}
            onRequest={() => setLoggingIn(true)}
            cookiePolicy="single_host_origin"
            disabled={isLoggingIn}
          />
          <p
            className="text-danger"
            style={{ padding: '10px', fontFamily: 'Rubik' }}
          >
            {error && `An error occured: ${error.split('_').join(' ')}`}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
