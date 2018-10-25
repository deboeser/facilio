import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "../common/PrivateRoute";
import NavBar from "./NavBar";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});

class WebApp extends Component {
  render() {
    const { classes, match } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <NavBar />
          <main className={classes.content}>
            <Route path={`${match.path}/dashboard`} component={NavBar} />
            {/* <Switch>
              <PrivateRoute path={`${match.path}/privat`} component={NavBar} />
            </Switch> */}
          </main>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(WebApp);
