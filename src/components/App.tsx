import React from 'react';
import '../styles/index.css';
import LoginComponent from './login/login.component';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthProvider } from '../context/auth-context';

const App = () => {
	const [user, setUser] = React.useState<GoogleLoginResponse | GoogleLoginResponseOffline>();
	const successfulSignIn = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		setUser(response);
	}
	const failureSignIn = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		console.log(response)
	}
	return (
		<div className="appContainer">
			<AuthProvider value={user}>
				{user ? <h1>Logged In</h1> : <LoginComponent successSignIn={successfulSignIn} failureSignIn={failureSignIn}/>}
			</AuthProvider>
		</div>
	);
}

export default App;