import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    backgroundColor: theme.palette.grey[100],
    paddingTop: theme.spacing.unit * 12
  },
  layout: {
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3
  },
  paper: {
    maxWidth: theme.singleDialog.width,
    marginLeft: "auto",
    marginRight: "auto",
    padding: theme.spacing.unit * 3
  },
  login: {}
});

const SingleDialog = props => {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <div className={classes.layout}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <Paper className={classes.paper}>{props.children}</Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SingleDialog);
