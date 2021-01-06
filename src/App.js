import React, { Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

//redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { SET_AUTHENTICATED } from './redux/type';
import { logoutUser, getUserData } from './redux/actions/userActions';

//utilities
import AuthRoute from './util/AuthRoute';

//components
import Navbar from './components/layout/Navbar';

//pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import user from './pages/user'

const theme = createMuiTheme ({
  palette: {
    primary: {
      main: '#00897b',
    },
    secondary: {
      main: '#ff80ab',
    },
  },
});

axios.defaults.baseURL = 'https://asia-northeast1-vlogdat-v2.cloudfunctions.net/api';

//token management logging out and in
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token); //decode the token(npm install --save jwt-decode)
  console.log(decodedToken);
  if(decodedToken.exp * 1000 < Date.now()) { //compares the time from now for expiring
    store.dispatch(logoutUser())
    window.location.href = '/login';
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common['AUTHORIZATION'] = token;
    store.dispatch( getUserData());
  }

}

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Provider store = {store}>
          <div className="App">
            <Router >
              <Navbar/>
              <Switch>
                <div className= "container">
                  <Route exact path='/' component={home} />
                  <Route exact path="/home" component={home}/>
                  <AuthRoute exact path="/login" component={login} />
                  <AuthRoute exact path="/signup" component={signup} />
                  <Route exact path="/users/:handle" component={user} />
                  <Route exact path="/users/:handle/post/:postId" component={user} />
                </div>
              </Switch>
            </Router>
          </div>
        </Provider>
      </MuiThemeProvider>
    );
  }
}

export default (App);


