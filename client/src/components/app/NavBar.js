import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

import { logoutUser } from "../../actions/authActions";

import Grid from "@material-ui/core/Grid";

import Button from "../common/Button";
import Can from "../common/Can";

import SideNav from "./SideNav";

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
    paddingRight: theme.spacing.unit * 2,
    [theme.breakpoints.down(theme.mobileBreak)]: {
      paddingTop: theme.spacing.unit * 1.5 - 6,
      paddingBottom: theme.spacing.unit * 1.5 - 6
    }
  },
  menuLeft: {
    float: "left"
  },
  menuRight: {
    float: "right"
  },
  menuScreen: {
    [theme.breakpoints.down(theme.mobileBreak)]: {
      display: "none"
    }
  },
  menuPhone: {
    display: "none",
    [theme.breakpoints.down(theme.mobileBreak)]: {
      display: "block"
    }
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

    const menuIcon = (
      <div className={classes.menuPhone}>
        <SideNav />
      </div>
    );

    menuLeft = (
      <div className={classes.menuScreen}>
        <Button className={classes.button} white>
          Dashboard
        </Button>
        <Can requiredRole="MANAGER">
          <Link to="/app/facilities">
            <Button className={classes.button} white>
              Facilities
            </Button>
          </Link>
        </Can>
        <Can requiredRole="MANAGER">
          <Button className={classes.button} white>
            Users
          </Button>
        </Can>
        <Can requiredRole="MANAGER">
          <Button className={classes.button} white>
            Bookings
          </Button>
        </Can>
        <Can requiredRole="USER" exact>
          <Button className={classes.button} white>
            New Booking
          </Button>
        </Can>
      </div>
    );

    menuRight = (
      <div className={classes.menuScreen}>
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
            <div className={classes.menuLeft}>
              {menuLeft}
              {menuIcon}
            </div>
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
