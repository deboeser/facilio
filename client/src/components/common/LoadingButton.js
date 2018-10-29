import React from "react";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import Button from "./Button";
import classNames from "classnames";

const styles = theme => ({
  wrapper: {
    position: "relative",
    display: "inline"
  },
  buttonSuccess: {
    backgroundColor: green[500],
    "&:hover": {
      backgroundColor: green[700]
    }
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  }
});

const LoadingButton = props => {
  const { classes, loading, success, onClick, disabled } = props;
  const buttonprops = {
    fullWidth: props.fullWidth,
    variant: props.variant,
    color: props.color,
    type: props.type
  };

  const buttonClassname = classNames(
    {
      [classes.buttonSuccess]: success
    },
    { [props.className]: !loading }
  );

  return (
    <div className={classes.wrapper}>
      <Button
        {...buttonprops}
        className={buttonClassname}
        disabled={loading || disabled}
        onClick={onClick}
      >
        {props.children}
      </Button>
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export default withStyles(styles)(LoadingButton);
