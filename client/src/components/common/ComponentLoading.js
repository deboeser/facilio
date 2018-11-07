import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

import isEmpty from "../../validation/is-empty";

const styles = theme => ({
  center: {
    textAlign: "center"
  },
  text: {
    marginTop: theme.spacing.unit * 2
  }
});

const ComponentLoading = props => {
  const { classes } = props;

  const text = !isEmpty(props.text) && (
    <Typography variant="subtitle1" className={classes.text}>
      {props.text}
    </Typography>
  );

  return (
    <div className={classes.center}>
      <CircularProgress size={50} className={classes.progress} />
      {text}
    </div>
  );
};

CircularProgress.propTypes = {
  text: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(ComponentLoading);
