import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import isEmpty from "../../validation/is-empty";
import { loginUser } from "../../actions/authActions";
import { triggerSnack } from "../../actions/snackActions";

import LoadingButton from "../common/LoadingButton";
import TextField from "../common/TextField";

const styles = theme => ({
  layout: {},
  form: {
    width: "100%",
    marginTop: theme.spacing.unit
  },
  textfield: {
    marginBottom: theme.spacing.unit * 2
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  },
  submitButton: {
    background: theme.palette.gradients.tealBlue
  },
  secondaryActions: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 4
  },
  forgot: {
    float: "left",
    color: theme.palette.grey[500]
  },
  signup: {
    float: "right",
    color: theme.palette.grey[500]
  }
});

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth) {
      this.setState({ auth: nextProps.auth });
    }
  }

  onChange = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const loginData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(loginData, this.loginSuccess.bind(this));
  };

  loginSuccess = e => {
    this.props.history.push("/app");
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.layout}>
        <Typography variant="h5" align="center">
          Sign in
        </Typography>
        <form onSubmit={this.onSubmit} className={classes.form}>
          <TextField
            className={classes.textfield}
            name="email"
            label="Email Address"
            error={!isEmpty(errors.email)}
            helperText={errors.email}
            onChange={this.onChange.bind(this)}
            fullWidth
          />
          <TextField
            className={classes.textfield}
            name="password"
            type="password"
            label="Password"
            error={!isEmpty(errors.password)}
            helperText={errors.password}
            onChange={this.onChange.bind(this)}
            fullWidth
          />
          <div className={classes.submit}>
            <LoadingButton
              type="submit"
              loading={this.props.auth.loading}
              variant="contained"
              color="primary"
              className={classes.submitButton}
              fullWidth
            >
              Sign In
            </LoadingButton>
          </div>
          <div className={classes.secondaryActions}>
            <Link to="/forgot-password">
              <Typography className={classes.forgot} variant="body2">
                I forgot my password
              </Typography>
            </Link>
            <Link to="/signup">
              <Typography className={classes.signup} variant="body2">
                Sign Up
              </Typography>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  triggerSnack: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = {
  loginUser,
  triggerSnack
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(LoginForm));
