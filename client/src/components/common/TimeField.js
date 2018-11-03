import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import TimePicker from "material-ui-pickers/TimePicker";

import isEmpty from "../../validation/is-empty";

const styles = {
  fontweight: {
    fontWeight: 500
  }
};

const TimeField = props => {
  const { classes, className, error, ...rest } = props;

  const fontWeightCorrection = {
    className: classes.fontweight
  };

  return (
    <TimePicker
      ampm={false}
      InputLabelProps={fontWeightCorrection}
      InputProps={fontWeightCorrection}
      FormHelperTextProps={fontWeightCorrection}
      error={!isEmpty(error)}
      helperText={error}
      {...rest}
    />
  );
};

TimeField.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool
};

export default withStyles(styles)(TimeField);
