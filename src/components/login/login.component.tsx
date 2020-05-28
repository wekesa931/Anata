import React from 'react';
import styles from './login.component.css';
import logo from '../../assets/img/antara-logo.png';
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

type LoginProps = {
    successSignIn: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void,
    failureSignIn: (response: GoogleLoginResponse | GoogleLoginResponseOffline) => void
}

const LoginComponent = (props: LoginProps) => {
    
    return (
        <div className={styles.container}>
           <div className={`card ${styles.loginCard}`}>
                <div>
                    <img src={logo} className={styles.logo}/>
                </div>
                <div>
                <GoogleLogin
					clientId="684998311530-c9tvo9lvednahhignbchcijlpqdlj1ei.apps.googleusercontent.com"
					buttonText="Login with your Antara Email"
					onSuccess={props.successSignIn}
					onFailure={props.failureSignIn}
					cookiePolicy={'single_host_origin'}
				/>
                </div>
           </div>
        </div>
    );
}

export default LoginComponent;