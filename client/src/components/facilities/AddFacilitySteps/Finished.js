import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";

import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import DoneIcon from "@material-ui/icons/Done";
import Zoom from "@material-ui/core/Zoom";
import Button from "../../common/Button";

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 10
  },
  progress: {
    marginBottom: theme.spacing.unit * 4
  },
  center: {
    textAlign: "center"
  },
  icon: {
    fontSize: "72px"
  },
  buttons: {
    display: "inline-block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 2,
    "& Button": {
      margin: theme.spacing.unit * 1
    }
  }
});

const Finished = props => {
  const { loading, classes } = props;

  let content;

  if (loading) {
    content = (
      <div className={classes.center}>
        <CircularProgress size={50} className={classes.progress} />
        <Typography variant="h5" gutterBottom>
          We are creating your new facility.
        </Typography>
        <Typography variant="body1">
          This may take a couple of seconds.
        </Typography>
      </div>
    );
  } else {
    content = (
      <div className={classes.center}>
        <Zoom in={true}>
          <DoneIcon className={classes.icon} color="primary" />
        </Zoom>
        <Typography variant="h5">Your new facility was created.</Typography>
        <div className={classes.buttons}>
          <Link to="/app/facilities">
            <Button variant="outlined">Your Facilities</Button>
          </Link>
          <Button variant="contained" color="primary" onClick={props.resetBase}>
            Create Another Facility
          </Button>
        </div>
      </div>
    );
  }

  return <div className={classes.root}>{content}</div>;
};

Finished.propTypes = {
  loading: PropTypes.bool.isRequired,
  newFacility: PropTypes.object,
  resetBase: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(withRouter(Finished));
