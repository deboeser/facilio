import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";

import Grid from "@material-ui/core/Grid";

import Button from "../common/Button";

const styles = theme => ({
  root: {
    flexGrow: 1,
    position: "fixed",
    background: theme.palette.gradients.tealBlue,
    boxShadow: `0px 0px 2px 2px rgba(0, 0, 0, 0.14)`,
    zIndex: 1100
  },
  spacing: {
    height: "60px"
  },
  menu: {
    maxWidth: theme.breakpoints.values.lg,
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
  onLogoutClick = () => {
    this.props.logoutUser();
    this.props.history.push("/login/");
  };

  render() {
    const { classes } = this.props;
    let menuLeft;
    let menuRight;

    menuLeft = (
      <div>
        <Button className={classes.button} white>
          Dashboard
        </Button>
        <Button className={classes.button} white>
          Facilities
        </Button>
        <Button className={classes.button} white>
          Users
        </Button>
        <Button className={classes.button} white>
          Bookings
        </Button>
      </div>
    );

    menuRight = (
      <div>
        <Button
          white
          className={classes.button}
          variant="outlined"
          color="primary"
          onClick={this.onLogoutClick.bind(this)}
        >
          Logout
        </Button>
      </div>
    );

    return (
      <div>
        <Grid container className={classes.root} spacing={0}>
          <Grid item xs={12} className={classes.menu}>
            <div className={classes.menuLeft}>{menuLeft}</div>
            <div className={classes.menuRight}>{menuRight}</div>
          </Grid>
        </Grid>
        <div className={classes.spacing} />
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles, { withTheme: true })
)(withRouter(NavBar));
