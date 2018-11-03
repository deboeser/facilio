import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import FacilityItem from "./FacilityItem";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3
  },
  heading: {
    marginBottom: theme.spacing.unit * 4
  }
});

class Facilities extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Typography variant="h3" className={classes.heading}>
          Your Facilities
        </Typography>
        <FacilityItem content="BBQ" />
        <FacilityItem content="Tennis Court" />
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Facilities);
