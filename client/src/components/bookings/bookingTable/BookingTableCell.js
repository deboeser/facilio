import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Checkbox from "@material-ui/core/Checkbox";

import CloseIcon from "@material-ui/icons/Close";
import CropIcon from "@material-ui/icons/CropDin";

import Tooltip from "../../common/Tooltip";

const styles = theme => ({
  tableCell: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    minWidth: theme.spacing.unit * 5,
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  },
  iconWrapper: {
    display: "inline-block",
    margin: theme.spacing.unit * 1.5,
    height: "24px"
  },
  icon: {
    color: theme.palette.grey[400]
  },
  offset: {
    left: "8px !important"
  }
});

const BookingTablCell = props => {
  const { classes } = props;

  const normalCell = key => (
    <div className={classes.tableCell}>
      <Checkbox />
    </div>
  );

  const disabledCell = key => (
    <div className={classes.tableCell}>
      <div className={classes.iconWrapper}>
        <Tooltip
          title="All selected slots must be on the same date"
          placement="top"
          enterDelay={200}
          classes={{ popper: classes.offset }}
        >
          <CropIcon className={classes.icon} />
        </Tooltip>
      </div>
    </div>
  );

  const bookedCell = key => (
    <div className={classes.tableCell}>
      <div className={classes.iconWrapper}>
        <Tooltip title="All resources booked" placement="top" classes={{ popper: classes.offset }}>
          <CloseIcon className={classes.icon} />
        </Tooltip>
      </div>
    </div>
  );

  const cellsDict = {
    n: normalCell,
    d: disabledCell,
    b: bookedCell
  };

  return cellsDict[props.type](props.key);
};

export default withStyles(styles, { withTheme: true })(BookingTablCell);
