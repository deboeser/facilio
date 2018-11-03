import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Grid from "@material-ui/core/Grid";

import NavBar from "./NavBar";
import Facilities from "../facilities/Facilities";
import AddFacility from "../facilities/AddFacility";

const styles = theme => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  wrapper: {
    flex: "1 1",
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.breakpoints.values.lg - theme.spacing.unit * 6,
    marginLeft: "auto",
    marginRight: "auto"
  },
  body: {
    flex: "1 1",
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "100%"
  }
});

class WebApp extends Component {
  render() {
    const { classes, match } = this.props;

    return (
      <Router>
        <div className={classes.root}>
          <NavBar />

          <Grid container className={classes.wrapper} spacing={0}>
            <Grid item xs={12} className={classes.body}>
              <div className={classes.content}>
                <Route
                  path={`${match.path}/facilities`}
                  component={Facilities}
                />
                <Route
                  path={`${match.path}/add-facility`}
                  component={AddFacility}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default withStyles(styles, { withTheme: true })(WebApp);
