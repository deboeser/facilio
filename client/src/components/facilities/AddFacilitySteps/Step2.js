import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

import DeleteIcon from "@material-ui/icons/Delete";

import Button from "../../common/Button";
import TextField from "../../common/TextField";
import isEmpty from "../../../validation/is-empty";

const styles = theme => ({
  form: {
    maxWidth: theme.singleDialog.width * 1.5,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 2
  },
  entry: {
    display: "flex",
    flexDirection: "row"
  },
  grititem: {
    display: "inline-flex"
  },
  addButton: {
    float: "Right"
  },
  textfield: {
    flexGrow: 1
  }
});

const countAppendix = number => {
  // TODO: Adapt for more than 20

  switch (number) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

class Step2 extends Component {
  componentWillUpdate() {
    this.stepValid();
  }

  componentDidMount() {
    this.stepValid();
  }

  stepValid = () => {
    const { superState } = this.props;
    const { facilityResources } = superState;
    let stepValid = true;
    facilityResources.forEach(item => {
      stepValid = stepValid && !isEmpty(item);
    });
    if (stepValid !== superState.valid.step1) {
      let { valid } = superState;
      valid.step1 = stepValid;
      this.props.setSuperState({ valid: valid });
    }
  };

  handleAddResource = () => {
    // TODO: Customize resource standard name
    let { facilityResources } = this.props.superState;
    facilityResources.push(`Resource ${facilityResources.length + 1}`);
    this.props.setSuperState({ facilityResources: facilityResources });
  };

  handleDeleteResource = index => () => {
    let { facilityResources } = this.props.superState;
    facilityResources.splice(index, 1);
    this.props.setSuperState({ facilityResources: facilityResources });
  };

  handleResourceChange = index => e => {
    let { facilityResources } = this.props.superState;
    facilityResources[index] = e.target.value;
    this.props.setSuperState({ facilityResources: facilityResources });
  };

  render() {
    const { classes, superState } = this.props;

    let resources = superState.facilityResources.map((item, key) => (
      <Grid item xs={12} key={key} className={classes.entry}>
        <IconButton
          onClick={this.handleDeleteResource(key).bind(this)}
          disabled={superState.facilityResources.length < 2}
        >
          <DeleteIcon />
        </IconButton>
        <TextField
          className={classes.textfield}
          name="facilityResourceCount"
          value={superState.facilityResources[key]}
          onChange={this.handleResourceChange(key).bind(this)}
          label={`Name of ${String(key + 1) + countAppendix(key + 1)} Resource`}
          helperText={
            isEmpty(superState.facilityResources[key]) && "Field is required"
          }
          error={isEmpty(superState.facilityResources[key])}
        />
      </Grid>
    ));

    return (
      <div>
        <Typography variant="h5">Step 2: Add Available Resources</Typography>
        <Typography variant="body2">
          Please define the resources that are available for this facility.
        </Typography>
        <Grid container spacing={16} className={classes.form}>
          {resources}
          <Grid item xs={12}>
            <Button
              className={classes.addButton}
              onClick={this.handleAddResource.bind(this)}
            >
              Add Resource
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Step2.propTypes = {
  setSuperState: PropTypes.func.isRequired,
  superState: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Step2);
