import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import TimeField from "../common/TimeField";

const styles = theme => ({
  slotNames: {
    marginTop: "auto",
    marginBottom: "auto",
    display: "inline-flex"
  }
});

const TimeSlotItem = props => {
  const { classes } = props;

  return (
    <Grid item xs={12}>
      <Grid container spacing={16}>
        <Grid item xs={12} sm={3}>
          <IconButton onClick={props.deleteSlot} disabled={props.disabled}>
            <DeleteIcon />
          </IconButton>
          <Typography variant="subtitle2" className={classes.slotNames}>
            Slot {props.index + 1}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={16}>
            <Grid item xs={12} sm={6}>
              <TimeField
                name="time-input"
                value={props.slot.from}
                label="From"
                onChange={props.onChangeTime("from")}
                error={props.slot.errorFrom}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TimeField
                name="time-input"
                value={props.slot.to}
                label="To"
                onChange={props.onChangeTime("to")}
                error={props.slot.errorTo}
                fullWidth
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

TimeSlotItem.propTypes = {
  deleteSlot: PropTypes.func.isRequired,
  onChangeTime: PropTypes.func.isRequired,
  slot: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  disabled: PropTypes.bool
};

export default withStyles(styles, { withTheme: true })(TimeSlotItem);
