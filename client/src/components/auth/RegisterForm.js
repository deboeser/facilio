import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import isEmpty from "../../validation/is-empty";
import { registerUser } from "../../actions/authActions";
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
  secondaryActions: {
    marginTop: theme.spacing.unit * 1,
    textAlign: "center"
  },
  signin: {
    color: theme.palette.grey[500]
  }
});

class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      email: "",
      password: "",
      password2: "",
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

    const signupData = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
    this.props.registerUser(signupData, this.signupSuccess.bind(this));
  };

  signupSuccess = e => {
    this.props.history.push("/login");
  };

  render() {
    const { classes } = this.props;
    const { errors } = this.state;

    return (
      <div className={classes.layout}>
        <Typography variant="h5" align="center">
          Sign Up
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
          <TextField
            className={classes.textfield}
            name="password2"
            type="password"
            label="Confirm Password"
            error={!isEmpty(errors.password2)}
            helperText={errors.password2}
            onChange={this.onChange.bind(this)}
            fullWidth
          />
          <div className={classes.submit}>
            <LoadingButton
              type="submit"
              loading={this.props.auth.loading}
              variant="contained"
              color="primary"
              fullWidth
            >
              Sign Up
            </LoadingButton>
          </div>
          <div className={classes.secondaryActions}>
            <Link to="/login">
              <Typography className={classes.signin} variant="body2">
                Already have an account? Go to Sign In
              </Typography>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

RegisterForm.propTypes = {
  registerUser: PropTypes.func.isRequired,
  triggerSnack: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  auth: state.auth
});

const mapDispatchToProps = {
  registerUser,
  triggerSnack
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(withRouter(RegisterForm));
