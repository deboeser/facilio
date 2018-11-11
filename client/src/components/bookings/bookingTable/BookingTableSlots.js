import React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  tableTimeslotsWrapper: {
    minWidth: 150,
    flexGrow: 0,
    borderRight: `1px solid ${theme.palette.grey[400]}`,
    "& div": {
      padding: theme.spacing.unit * 2.5,
      textAlign: "right",
      height: theme.spacing.unit * 3,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      ...theme.typography.body1
    }
  }
});

const BookingTableSlots = props => {
  const { classes } = props;

  // TODO: Get elems from props
  const elems = ["07:00 - 14:00", "15:00 - 22:00"];

  const slotCells = elems.map((item, key) => <div key={key}>{item}</div>);

  return (
    <div className={classes.tableTimeslotsWrapper}>
      <div />
      {slotCells}
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(BookingTableSlots);
