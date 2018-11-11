import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";

import BookingTableHeader from "./bookingTable/BookingTableHeader";
import BookingTableSlots from "./bookingTable/BookingTableSlots";
import BookingTableRow from "./bookingTable/BookingTableRow";
import BookingTableWeekNav from "./bookingTable/BookingTableWeekNav";

import { getMonday, offsetDate, getTimeSpanString, getWeek } from "../../utils/timeDateUtils";

const styles = theme => {
  return {
    root: {
      width: "100%",
      marginTop: theme.spacing.unit * 3
    },
    table: {
      display: "flex",
      flexDirection: "row",
      flex: "1 1"
    },
    tableBodyHeaderWrapper: {
      flexGrow: 1,
      overflowX: "auto"
    }
  };
};

class OwnTable extends Component {
  constructor(props) {
    super(props);

    const monday = getMonday(new Date());

    this.state = {
      monday: monday,
      week: getWeek(monday)
    };
  }

  onNextWeek = () => {
    const newMonday = offsetDate(this.state.monday, 7);
    const newWeek = getWeek(newMonday);
    this.setState({ monday: newMonday, week: newWeek });
  };

  onPrevWeek = () => {
    const newMonday = offsetDate(this.state.monday, -7);
    const newWeek = getWeek(newMonday);
    this.setState({ monday: newMonday, week: newWeek });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <BookingTableWeekNav
          week={getTimeSpanString(this.state.monday, offsetDate(this.state.monday, 6))}
          onNextWeek={this.onNextWeek.bind(this)}
          onPrevWeek={this.onPrevWeek.bind(this)}
        />
        <Paper>
          <div className={classes.table}>
            <BookingTableSlots />
            <div className={classes.tableBodyHeaderWrapper}>
              <BookingTableHeader week={this.state.week} />
              <BookingTableRow />
              <BookingTableRow />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

OwnTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(OwnTable);
