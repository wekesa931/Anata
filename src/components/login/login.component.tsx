import React from 'react';
import styles from './login.component.css';
import logo from '../../assets/img/logo/antara-logo.png';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

type LoginProps = {
    successSignIn: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
    setLoggingIn: (status: boolean) => void,
    isLoggingIn: boolean
}

const LoginComponent = (props: LoginProps) => {
    const [error, setError] = React.useState<string>('');

    const failureSignIn = ({error}: any) => {
        setError(error);
        props.setLoggingIn(false);
    }
    
    return (
        <div className={styles.container}>
           <div className={`card ${styles.loginCard}`}>
                <div>
                    <img src={logo} className={styles.logo}/>
                </div>
                <div>
                <GoogleLogin
					clientId="684998311530-c9tvo9lvednahhignbchcijlpqdlj1ei.apps.googleusercontent.com"
					buttonText={props.isLoggingIn ? "Logging you in..." : "Login with your Antara Email"}
					onSuccess={props.successSignIn}
                    onFailure={failureSignIn}
                    onRequest={() => props.setLoggingIn(true)}
                    cookiePolicy={'single_host_origin'}
                    disabled={props.isLoggingIn}
				/>
                <p className="text-danger" style={{padding: "10px", fontFamily: "Rubik"}}>{error && `An error occured: ${error.split('_').join(' ')}`}</p>
                </div>
           </div>
        </div>
    );
}

export default LoginComponent;