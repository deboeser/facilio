import React from "react";
import { withStyles } from "@material-ui/core/styles";

import BookingTableCell from "./BookingTableCell";

const styles = theme => ({
  tableRow: {
    display: "flex",
    flexDirection: "row",
    flex: "1 1"
  },
  tableCell: {
    flexGrow: 1,
    padding: theme.spacing.unit * 1,
    textAlign: "center",
    minWidth: theme.spacing.unit * 6,
    borderBottom: `1px solid ${theme.palette.grey[300]}`
  }
});

const BookingTableRow = props => {
  const { classes } = props;

  // TODO: Get elems from props
  const elems = ["n", "n", "b", "b", "d", "n", "d"];

  const rowCells = elems.map((item, key) => <BookingTableCell type={item} key={key} />);

  return <div className={classes.tableRow}>{rowCells}</div>;
};

export default withStyles(styles, { withTheme: true })(BookingTableRow);
