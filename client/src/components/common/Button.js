import React from "react";
import { withStyles } from "@material-ui/core/styles";
import ButtonMaterial from "@material-ui/core/Button";

const styles = theme => ({
  label: {
    textTransform: "capitalize",
    fontFamily: "Raleway",
    fontWeight: 600
  }
});

const Button = props => {
  const { classes } = props;
  const buttonprops = { ...props, children: [] };
  return <ButtonMaterial {...buttonprops}>{props.children}</ButtonMaterial>;
};

export default withStyles(styles, { withTheme: true })(Button);
