import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";

import jwt_decode from "jwt-decode";

import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import { createMuiTheme } from "@material-ui/core/styles";

import WebApp from "./components/app/WebApp";
import Login from "./components/auth/Login";

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
const random = {
  500: "#6A65F1"
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: blue
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
          <Router>
            <div className="App" id="app">
              <Route path="/app" component={WebApp} />
              <Route path="/login" component={Login} />
            </div>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

export default App;
