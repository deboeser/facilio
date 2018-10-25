import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";

import MenuIcon from "@material-ui/icons/Menu";

import Button from "../common/Button";

const styles = theme => ({
  root: {
    flexGrow: 1
    // backgroundColor: "#efefef"
  },
  menu: {
    maxWidth: theme.breakpoints.values.lg,
    // backgroundColor: "#efefef",
    marginLeft: "auto",
    marginRight: "auto",
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  menuLeft: {
    float: "left"
  },
  menuRight: {
    float: "right"
  },
  button: {
    marginLeft: theme.spacing.unit * 0.5,
    marginRight: theme.spacing.unit * 0.5
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    let menuLeft;
    let menuRight;

    menuLeft = (
      <div>
        <Button className={classes.button}>Dashboard</Button>
        <Button className={classes.button}>Facilities</Button>
        <Button className={classes.button}>Users</Button>
        <Button className={classes.button}>Bookings</Button>
      </div>
    );

    menuRight = (
      <div>
        <Button className={classes.button} variant="outlined" color="primary">
          Logout
        </Button>
      </div>
    );

    return (
      <Grid container className={classes.root} spacing={0}>
        <Grid item xs={12} className={classes.menu}>
          <div className={classes.menuLeft}>{menuLeft}</div>
          <div className={classes.menuRight}>{menuRight}</div>
        </Grid>
      </Grid>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default compose(
  connect(
    mapStateToProps,
    null
  ),
  withStyles(styles, { withTheme: true })
)(NavBar);
