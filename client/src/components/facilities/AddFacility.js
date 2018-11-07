import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
import Divider from "@material-ui/core/Divider";

import Button from "../common/Button";
import Stepper from "../common/Stepper";
import Tooltip from "../common/Tooltip";
import Step1 from "./AddFacilitySteps/Step1";
import Step2 from "./AddFacilitySteps/Step2";
import Step3 from "./AddFacilitySteps/Step3";
import Finished from "./AddFacilitySteps/Finished";

import isEmpty from "../../validation/is-empty";
import { datetimeToTimestring } from "../../utils/timeDateConversion";

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

    this.state = { ...this.createInitialState() };
  }

  createInitialState = () => {
    const now = new Date();
    const then = new Date(new Date().setHours(now.getHours() + 1));

    const baseValid = {
      step0: false,
      step1: false,
      step2: false
    };

    const baseSlots = [
      {
        from: now,
        to: then,
        errorFrom: "",
        errorTo: ""
      }
    ];

    return {
      activeStep: 0,
      skipped: new Set(),
      facilityType: "",
      facilityName: "",
      facilityDeposit: "",
      facilityFee: "",
      requiresDeposit: false,
      requiresFee: false,
      facilityConfirmation: false,
      loading: false,
      saveLoading: true,
      facilityResources: ["Resource 1"],
      valid: { ...baseValid },
      facilitySlots: [...baseSlots]
    };
  };

  resetComponent = () => {
    this.setState({ ...this.createInitialState() });
  };

  handleNext = () => {
    const { activeStep } = this.state;
    let { skipped } = this.state;
    if (this.state.skipped.has(activeStep)) {
      skipped = new Set(skipped.values());
      skipped.delete(activeStep);
    }
    if (activeStep === 2) {
      this.saveFacility();
      this.setState({
        saveLoading: true,
        activeStep: activeStep + 1,
        skipped
      });
    } else {
      this.setState({
        activeStep: activeStep + 1,
        skipped
      });
    }
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

  setSuperState = newState => {
    this.setState(newState);
  };

  activeStepValid = () => {
    if (this.state.activeStep < 3) {
      return this.state.valid[`step${this.state.activeStep}`];
    } else {
      return true;
    }
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Step1
            handleStateChange={this.handleStateChange.bind(this)}
            handleStateToggle={this.handleStateToggle.bind(this)}
            setSuperState={this.setSuperState.bind(this)}
            superState={this.state}
          />
        );
      case 1:
        return <Step2 setSuperState={this.setSuperState.bind(this)} superState={this.state} />;
      case 2:
        return <Step3 setSuperState={this.setSuperState.bind(this)} superState={this.state} />;
      case 3:
        return <Finished resetBase={this.resetComponent.bind(this)} loading={this.state.saveLoading} />;
      default:
        return "Unknown step";
    }
  };

  saveFacility = () => {
    const { state } = this;

    const facilitySlots = state.facilitySlots.map(item => {
      return {
        from: datetimeToTimestring(item.from),
        to: datetimeToTimestring(item.to)
      };
    });

    const newFacility = {
      name: state.facilityName,
      resources: state.facilityResources,
      deposit: isEmpty(state.facilityDeposit) ? 0 : Number(state.facilityDeposit),
      fee: isEmpty(state.facilityFee) ? 0 : Number(state.facilityFee),
      confirmation: state.facilityConfirmation,
      slots: facilitySlots
    };

    axios
      .post("/api/facility/", newFacility)
      .then(res => {
        this.setState({ saveLoading: false });
      })
      .catch(err => {
        this.setState({ saveLoading: false });
        console.log(err.response.data);
      });
  };

  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

    let buttonSection;

    if (activeStep < 3) {
      buttonSection = (
        <div className={classes.buttonSection}>
          <div className={classes.stepperButtonsLeft}>
            <Tooltip title="Reset this wizard" placement="top-start">
              <Button onClick={this.resetComponent}>Reset</Button>
            </Tooltip>
          </div>
          <div className={classes.stepperButtonsRight}>
            <Button disabled={activeStep === 0} onClick={this.handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleNext}
              disabled={this.state.loading || !this.activeStepValid()}
            >
              {activeStep === steps.length - 1 ? "Add New Facility" : "Next"}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <div className={classes.loadingPlaceholder}>{this.state.loading && <LinearProgress />}</div>
          <div className={classes.headerSection}>
            <Typography variant="h3" gutterBottom>
              Add a new Facility
            </Typography>
            <Stepper steps={steps} activeStep={activeStep} skipped={this.state.skipped} />
          </div>
          <Divider />
          <div className={classes.contentSection}>{this.getStepContent(activeStep)}</div>
          <Divider />
          {buttonSection}
        </Paper>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(AddFacility);
