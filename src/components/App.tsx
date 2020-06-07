import React from 'react';
import '../styles/index.css';
import LoginComponent from './login/login.component';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { AuthProvider } from '../context/auth-context';
import Dashboard from '../pages/dashboard/dashboard';
import { ThemeProvider } from '@material-ui/styles';
import theme from '../styles/theme';

const App = () => {
	//@ts-ignore
	const currentUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
	const [user, setUser] = React.useState<GoogleLoginResponse | GoogleLoginResponseOffline | null>
		(currentUser);
	const [isLoggingIn, setLoggingIn] = React.useState<Boolean>(false);

	const successfulSignIn = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
		sessionStorage.setItem('user', JSON.stringify(response));
		setUser(response);
	}

	return (
		<div className="appContainer">
			<AuthProvider value={user}>
				<ThemeProvider theme={theme}>
					{user ?
						<Dashboard /> :
						<LoginComponent successSignIn={successfulSignIn} setLoggingIn={setLoggingIn} isLoggingIn={isLoggingIn} />}
				</ThemeProvider>
			</AuthProvider>
		</div>
	);
}

export default App;