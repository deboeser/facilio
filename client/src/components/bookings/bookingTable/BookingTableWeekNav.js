import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

import Typography from "@material-ui/core/Typography";

import NextIcon from "@material-ui/icons/NavigateNext";
import PrevIcon from "@material-ui/icons/NavigateBefore";

import Button from "../../common/Button";

const styles = theme => ({
  root: {
    // borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  weekWrapper: {
    display: "flex",
    flexDirection: "row",
    flex: "1 1",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    width: "100%"
  },
  weekButton: {
    display: "inline-flex",
    flexGrow: 0
  },
  weekText: {
    display: "block",
    flexGrow: 1,
    marginTop: "auto",
    marginBottom: "auto"
  },
  buttonText: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.down(theme.mobileBreak)]: {
      display: "none"
    }
  },
  btn: {
    minWidth: 0
  }
});

const BookingTableWeekNav = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <div className={classes.weekWrapper}>
        <div className={classes.weekButton}>
          <Button color="primary" size="small" className={classes.btn} onClick={props.onPrevWeek}>
            <PrevIcon />
            <span className={classes.buttonText}>Previous Week</span>
          </Button>
        </div>
        <Typography variant="h6" align="center" className={classes.weekText}>
          {props.week}
        </Typography>
        <div className={classes.weekButton}>
          <Button color="primary" size="small" className={classes.btn} onClick={props.onNextWeek}>
            <span className={classes.buttonText}>Next Week</span>
            <NextIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

BookingTableWeekNav.propTypes = {
  week: PropTypes.string.isRequired,
  onNextWeek: PropTypes.func.isRequired,
  onPrevWeek: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(BookingTableWeekNav);
