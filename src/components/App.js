import React from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { StitchAuthProvider, useStitchAuth } from './StitchAuth';
import { Login } from './Login';
import '../App.css';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import { AppNav } from './AppNav';
import Contact from '../components/contact/Contact';

export function App() {
  return (
    <div>
      <StitchAuthProvider>
        <AppUI />
      </StitchAuthProvider>
    </div>
  );
}

function AppUI() {
  const {
    isLoggedIn,
    actions: { handleLogout },
  } = useStitchAuth();

  function handleClick() {
    handleLogout();
  }

  function PrivateRoute({ children, ...rest }) {
    console.log('ILI?' + isLoggedIn);

    return (
      <Route
        {...rest}
        render={({ location }) =>
          isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  function LoginRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          !isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: { from: location },
              }}
            />
          )
        }
      />
    );
  }

  return (
    <Router>
      <AppNav handleClick={handleClick} isLoggedIn={isLoggedIn} />
      <section className='container'>
        <Switch>
          <LoginRoute path='/login'>
            <Login />
          </LoginRoute>
          <PrivateRoute path='/dashboard'>
            <Dashboard />
          </PrivateRoute>
          <PrivateRoute exact path={`/contacts/:id`}>
            <Contact />
          </PrivateRoute>
          <Redirect exact from='/' to='/dashboard' />
        </Switch>
      </section>
    </Router>
  );
}
