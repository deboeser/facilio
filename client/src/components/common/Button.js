import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MaterialButton from "@material-ui/core/Button";
import classnames from "classnames";

const styles = theme => ({
  root: {
    borderRadius: "18px"
  },
  label: {
    textTransform: "capitalize",
    fontWeight: 600
  },
  whiteDesign: {
    borderColor: "rgba(255,255,255,0.5)",
    color: "#FFF",
    "&:hover": {
      borderColor: "rgba(255,255,255,1)"
    }
  }
});

const Button = props => {
  let { children, className, classes, white, ...buttonprops } = props;
  let { whiteDesign, ...remaining } = classes;
  buttonprops = { ...buttonprops, classes: { ...remaining } };

  return (
    <MaterialButton
      {...buttonprops}
      className={classnames(className, white && props.classes.whiteDesign)}
    >
      {children}
    </MaterialButton>
  );
};

export default withStyles(styles, { withTheme: true })(Button);
