import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  },
  heading: {}
});

class FacilityItem extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.root}>
        <Typography variant="h5" className={classes.heading}>
          {this.props.content}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(FacilityItem);
