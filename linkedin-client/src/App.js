import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
// Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/types';
import { logoutUser, getUserData } from './redux/actions/userActions';
//Pages
import home from './pages/home'
import signup from './pages/signup';
import login from './pages/login';
import user from './pages/user';

import axios from 'axios';

axios.defaults.baseURL = 'https://europe-west1-linkedin-4f587.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = '/';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              component={home}
            />

            <Route
              exact
              path="/signup"
              component={signup}
            />

            <Route
              exact
              path="/login"
              component={login}
            />
            <Route exact path="/users/:handle" component={user} />
            <Route
              exact
              path="/users/:handle/scream/:screamId"
              component={user}
            />
          </Switch>
        </Router>
      </Provider> 
      
);
  }
}

export default App;
