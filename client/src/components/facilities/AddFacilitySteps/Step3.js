import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import moment from "moment";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import Button from "../../common/Button";
import TimeSlotItem from "../TimeSlotItem";

import isEmpty from "../../../validation/is-empty";
import { isNull } from "util";

const styles = theme => ({
  form: {
    maxWidth: theme.singleDialog.width * 1.5,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 2
  },
  slotNames: {
    marginTop: "auto",
    marginBottom: "auto",
    display: "inline-flex"
  },
  addButton: {
    float: "Right"
  }
});

class Step3 extends Component {
  componentWillUpdate() {
    this.stepValid();
  }

  onChangeTime = key => type => time => {
    time = time._d;

    let other = "from";
    if (type === "from") {
      other = "to";
    }
    const { facilitySlots } = this.props.superState;
    facilitySlots[key] = {
      [type]: time,
      [other]: facilitySlots[key][other],
      errorFrom: facilitySlots[key].errorFrom,
      errorTo: facilitySlots[key].errorTo
    };
    this.props.setSuperState({ facilitySlots: facilitySlots });
  };

  addSlot = () => {
    let { facilitySlots } = this.props.superState;

    let lastFrom = facilitySlots[facilitySlots.length - 1].from;
    let lastTo = facilitySlots[facilitySlots.length - 1].to;
    const now = new Date(Number(lastTo));
    const then = new Date(Number(lastTo) + (lastTo - lastFrom));

    facilitySlots.push({
      from: now,
      to: then
    });
    this.props.setSuperState({ facilitySlots: facilitySlots });
  };

  deleteSlot = key => () => {
    let { facilitySlots } = this.props.superState;
    facilitySlots.splice(key, 1);
    this.props.setSuperState({ facilitySlots: facilitySlots });
  };

  validateSlots = () => {
    let { facilitySlots } = this.props.superState;
    let newFacilitySlots = [];
    // TODO: Add check of timeslots are overlapping
    facilitySlots.forEach(item => {
      isNull(item.from)
        ? (item.errorFrom = "Field is required")
        : (item.errorFrom = "");
      isNull(item.to)
        ? (item.errorTo = "Field is required")
        : (item.errorTo = "");
      if (isEmpty(item.errorTo) && isEmpty(item.errorFrom)) {
        if (item.from.getTime() === item.to.getTime()) {
          item.errorFrom = "Slot start and end are equal";
          item.errorTo = "Slot start and end are equal";
        } else if (item.from.getTime() > item.to.getTime()) {
          item.errorFrom = "Slot start must lie before end";
          item.errorTo = "Slot start must lie before end";
        }
      }
      newFacilitySlots.push(item);
    });
    if (JSON.stringify(facilitySlots) !== JSON.stringify(newFacilitySlots)) {
      this.props.setSuperState({ facilitySlots: newFacilitySlots });
    }
  };

  stepValid = () => {
    this.validateSlots();
    const { superState } = this.props;
    let { facilitySlots } = superState;
    let stepValid = true;
    facilitySlots.forEach(item => {
      if (!isEmpty(item.errorFrom) || !isEmpty(item.errorTo)) {
        stepValid = false;
      }
    });

    let { valid } = superState;
    if (valid.step2 !== stepValid) {
      valid.step2 = stepValid;
      this.props.setSuperState({ valid: valid });
    }
  };

  render() {
    const { classes, superState } = this.props;

    let timeslots = superState.facilitySlots.map((item, key) => {
      return (
        <TimeSlotItem
          onChangeTime={this.onChangeTime(key).bind(this)}
          deleteSlot={this.deleteSlot(key).bind(this)}
          key={key}
          index={key}
          slot={this.props.superState.facilitySlots[key]}
          disabled={superState.facilitySlots.length === 1}
        />
      );
    });

    return (
      <div>
        <Typography variant="h5">Step 3: Define Booking Timeslots</Typography>
        <Typography variant="body2">
          Please define the timeslots when the facility can be booked on a daily
          bases.
        </Typography>
        <Grid container spacing={16} className={classes.form}>
          {timeslots}
          <Grid item xs={12}>
            <Button
              className={classes.addButton}
              onClick={this.addSlot.bind(this)}
            >
              Add Timeslot
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Step3.propTypes = {
  setSuperState: PropTypes.func.isRequired,
  superState: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Step3);
