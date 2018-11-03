import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";
import MomentUtils from "material-ui-pickers/utils/moment-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";

import WebApp from "./components/app/WebApp";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import PrivateRoute from "./components/common/PrivateRoute";

import blue from "@material-ui/core/colors/blue";

import store from "./store";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import "./App.css";

// Check for token availablity
if (localStorage.jwtToken) {
  // set auth token header
  setAuthToken(localStorage.jwtToken);
  // Decode and get user info, get expiration, set user
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  //Check of expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  }
}

// A custom-defined color must have a 500 property
const secondaryColor = {
  500: "rgb(29, 130, 147)",
  A400: "rgb(29, 130, 147)"
};

const primaryColor = {
  500: "rgb(32, 96, 160)",
  A400: "rgb(32, 96, 160)"
};

const theme = createMuiTheme({
  palette: {
    primary: primaryColor,
    secondary: secondaryColor,
    gradients: {
      tealBlue:
        "linear-gradient(to right, rgb(29, 130, 147) 0%, rgb(32, 96, 160) 100%)"
    }
  },
  typography: {
    fontFamily: "Raleway",
    body2: {
      fontWeight: 400
    }
  },
  singleDialog: {
    width: 400
  }
});

class App extends Component {
  render() {
    console.log(theme);

    return (
      <Provider store={store}>
        <MuiThemeProvider theme={theme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Router>
              <div className="App" id="app">
                <Switch>
                  <PrivateRoute path="/app" component={WebApp} />
                </Switch>
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={Register} />
              </div>
            </Router>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
