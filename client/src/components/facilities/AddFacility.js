import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";

import Button from "../common/Button";
import Stepper from "../common/Stepper";

import Step1 from "./AddFacilitySteps/Step1";
import Step2 from "./AddFacilitySteps/Step2";
import Step3 from "./AddFacilitySteps/Step3";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1"
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    flex: "1 1"
  },
  headerSection: {
    padding: theme.spacing.unit * 3
  },
  contentSection: {
    padding: theme.spacing.unit * 3,
    flex: "1 1"
  },
  buttonSection: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  },
  stepperButtonsRight: {
    float: "right",
    "& Button": {
      marginLeft: theme.spacing.unit
    }
  },
  stepperButtonsLeft: {
    float: "left",
    "& Button": {
      marginRight: theme.spacing.unit
    }
  },
  loadingPlaceholder: {
    height: 5
  }
});

class AddFacility extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      skipped: new Set(),
      facilityType: "",
      facilityName: "",
      facilityDeposit: "",
      facilityFee: "",
      requiresDeposit: false,
      requiresFee: false,
      facilityConfirmation: false,
      loading: false
    };
  }

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.state.skipped.has(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    this.setState({
      activeStep: activeStep + 1,
      skipped
    });
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1
    }));
  };

  handleSkip = () => {
    const { activeStep } = this.state;

    this.setState(state => {
      const skipped = new Set(state.skipped.values());
      skipped.add(activeStep);
      return {
        activeStep: state.activeStep + 1,
        skipped
      };
    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0
    });
  };

  getSteps = () => {
    return [
      { label: "Facility Properties", optional: false },
      { label: "Available Resources", optional: false },
      { label: "Timeslots for Booking", optional: false }
    ];
  };

  handleStateChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleStateToggle = e => {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Step1
            handleStateChange={this.handleStateChange.bind(this)}
            handleStateToggle={this.handleStateToggle.bind(this)}
            superState={this.state}
          />
        );
      case 1:
        return <Step2 />;
      case 2:
        return <Step3 />;
      default:
        return "Unknown step";
    }
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.loadingPlaceholder}>
            {this.state.loading && <LinearProgress />}
          </div>
          <div className={classes.headerSection}>
            <Typography variant="h3" gutterBottom>
              Add a new Facility
            </Typography>
            <Stepper
              steps={steps}
              activeStep={activeStep}
              skipped={this.state.skipped}
            />
          </div>
          <Divider />
          <div className={classes.contentSection}>
            {this.getStepContent(activeStep)}
          </div>
          <Divider />
          <div className={classes.buttonSection}>
            <div className={classes.stepperButtonsLeft}>
              <Button>Cancel</Button>
            </div>
            <div className={classes.stepperButtonsRight}>
              <Button disabled={activeStep === 0} onClick={this.handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleNext}
                disabled={this.state.loading}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddFacility);
