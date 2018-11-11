import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  tableHeader: {
    display: "flex",
    flexDirection: "row",
    flex: "1 1",
    "& > div": {
      flexGrow: 1,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      textAlign: "center",
      minWidth: theme.spacing.unit * 7,
      borderBottom: `1px solid ${theme.palette.grey[300]}`,
      height: 32
    }
  }
});

const BookingTableHeader = props => {
  const { classes } = props;

  const headerCells = props.week.map((item, key) => {
    return (
      <div key={key}>
        <Typography variant="subtitle2">{item.weekday}</Typography>
        <Typography variant="caption">{item.formattedDate}</Typography>
      </div>
    );
  });

  return <div className={classes.tableHeader}>{headerCells}</div>;
};

BookingTableHeader.propTypes = {
  week: PropTypes.array.isRequired
};

export default withStyles(styles, { withTheme: true })(BookingTableHeader);
