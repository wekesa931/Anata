import React from 'react';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import Login from './login/login.component';
import Dashboard from '../pages/dashboard/dashboard';
import { AuthProvider } from '../context/auth-context';
import theme from '../styles/theme';
import Forms from './forms/forms.component';

const Routes = () => {
    //@ts-ignore
    const currentUser = sessionStorage.getItem('user') ? JSON.parse(sessionStorage.getItem('user')) : null;
    const [user, setUser] = React.useState<GoogleLoginResponse | GoogleLoginResponseOffline | null>
        (currentUser);

    const [isLoggingIn, setLoggingIn] = React.useState<boolean>(false);

    return (
        <AuthProvider value={user}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Switch>
                        <Route path="/login">
                            <Login setUser={setUser} setLoggingIn={setLoggingIn} isLoggingIn={isLoggingIn} />}
                        </Route>
                        <ProtectedRoute exact path="/" user={user}>
                            <Dashboard />
                        </ProtectedRoute>
                        <ProtectedRoute exact path="/member/:recId" user={user}>
                            <div style={{padding: "1rem"}}>
                            <p>Patient name and details will appear here WIP</p>
                            <Forms/>
                            </div>
                        </ProtectedRoute>
                    </Switch>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    )
}

function ProtectedRoute({ children, user, ...rest }: any) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                user ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default Routes;