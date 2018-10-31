import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import TextField from "../../common/TextField";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import InputAdornment from "@material-ui/core/InputAdornment";

import isEmpty from "../../../validation/is-empty";

const styles = theme => ({
  form: {
    maxWidth: theme.singleDialog.width * 1.5,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 2
  },
  grititem: {
    display: "inline-flex"
  },
  textfield: {
    // marginBottom: theme.spacing.unit * 2
  }
});

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requiresDeposit: false,
      requiresFee: false,
      errors: {}
    };
  }

  onBlurCurrency = e => {
    let value;
    this.props.handleStateChange(e);
    if (!isEmpty(e.target.value)) {
      value = Number(e.target.value);
      if (isNaN(value)) {
        let errors = this.state.errors;
        errors[e.target.name] = "Must be a numeric value";
        this.setState({ errors: errors });
      } else {
        let errors = this.state.errors;
        errors[e.target.name] = "";
        this.setState({ errors: errors });
        let eNew = { target: { name: e.target.name, value: value.toFixed(2) } };
        this.props.handleStateChange(eNew);
      }
    } else {
      let errors = this.state.errors;
      errors[e.target.name] = "Fee field is required";
      this.setState({ errors: errors });
    }
  };

  render() {
    const {
      classes,
      superState,
      handleStateChange,
      handleStateToggle
    } = this.props;

    let fee;
    let deposit;

    if (superState.requiresFee) {
      fee = (
        <Grid item xs={12} md={6} className={classes.grititem}>
          <TextField
            name="facilityFee"
            label="Booking Fee"
            className={classes.textfield}
            value={superState.facilityFee}
            onChange={handleStateChange}
            onBlur={this.onBlurCurrency}
            helperText={this.state.errors.facilityFee}
            error={!isEmpty(this.state.errors.facilityFee)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">SGD</InputAdornment>
              )
            }}
            fullWidth
          />
        </Grid>
      );
    }

    if (superState.requiresDeposit) {
      deposit = (
        <Grid item xs={12} md={6} className={classes.grititem}>
          <TextField
            name="facilityDeposit"
            label="Booking Deposit"
            className={classes.textfield}
            value={superState.facilityDeposit}
            onChange={handleStateChange}
            onBlur={this.onBlurCurrency}
            helperText={this.state.errors.facilityDeposit}
            error={!isEmpty(this.state.errors.facilityDeposit)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">SGD</InputAdornment>
              )
            }}
            fullWidth
          />
        </Grid>
      );
    }

    return (
      <div>
        <Typography variant="h5">Step 1: Facility Properties</Typography>
        <Typography variant="body2" gutterBottom>
          Please define the basic properties of the new facility.
        </Typography>
        <Grid container spacing={16} className={classes.form}>
          <Grid item xs={12}>
            <TextField
              name="facilityType"
              label="Facility Type"
              value={superState.facilityType}
              onChange={handleStateChange}
              className={classes.textfield}
              helperText="This will not be visible to your residents."
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              name="facilityName"
              label="Facility Name"
              value={superState.facilityName}
              onChange={handleStateChange}
              className={classes.textfield}
              helperText="This will be the name visible to your residents."
              fullWidth
            />{" "}
          </Grid>
          <Grid item xs={12} className={classes.grititem}>
            <FormControlLabel
              control={
                <Checkbox
                  name="facilityConfirmation"
                  checked={superState.facilityConfirmation}
                  onChange={handleStateToggle}
                  color="primary"
                />
              }
              label="Booking requires confirmation by the management office"
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={superState.requiresDeposit ? 6 : 12}
            className={classes.grititem}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="requiresDeposit"
                  checked={superState.requiresDeposit}
                  onChange={handleStateToggle}
                  color="primary"
                />
              }
              label="Booking requires deposit"
            />
          </Grid>
          {deposit}
          <Grid
            item
            xs={12}
            md={superState.requiresFee ? 6 : 12}
            className={classes.grititem}
          >
            <FormControlLabel
              control={
                <Checkbox
                  name="requiresFee"
                  checked={superState.requiresFee}
                  onChange={handleStateToggle}
                  color="primary"
                />
              }
              label="Booking requires fee"
            />
          </Grid>
          {fee}
        </Grid>
      </div>
    );
  }
}

Step1.propTypes = {
  handleStateChange: PropTypes.func.isRequired,
  handleStateToggle: PropTypes.func.isRequired,
  superState: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Step1);
