import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";
import { withRouter, Link } from "react-router-dom";

import Typography from "@material-ui/core/Typography";

import FacilityItem from "./FacilityItem";
import CompnentLoading from "../common/ComponentLoading";

import Button from "../common/Button";

import { getFacilities } from "../../actions/facilityActions";

import isEmpty from "../../validation/is-empty";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 3
  },
  headingWrapper: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    marginBottom: theme.spacing.unit * 4
  },
  headingTitle: {
    display: "inline-flex",
    flexGrow: 1
  },
  headingButton: {
    display: "inline-flex",
    flexGrow: 0,
    marginTop: "auto",
    marginBottom: "auto"
  },
  progress: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: theme.spacing.unit * 2
  }
});

class Facilities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialogOpen: false,
      facilities: {}
    };
  }

  componentDidMount() {
    if (isEmpty(this.state.facilities)) {
      this.props.getFacilities();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.facilities) {
      this.setState({ facilities: nextProps.facilities });
    }
  }

  render() {
    const { classes } = this.props;
    const { facilities, loading } = this.state.facilities;

    let content;

    if (loading) {
      content = (
        <CompnentLoading text="We are loading your facilities. This may take a second." />
      );
    } else {
      if (isEmpty(facilities)) {
        // TODO: Proper empty screen
        content = (
          <Typography variant="body1">
            You don't have any facilities yet.
          </Typography>
        );
      } else {
        content = facilities.map((item, key) => (
          <FacilityItem facility={item} key={key} />
        ));
      }
    }

    return (
      <div>
        <div className={classes.headingWrapper}>
          <Typography variant="h3" className={classes.headingTitle}>
            Your Facilities
          </Typography>
          <Link to="/app/add-facility">
            <Button
              className={classes.headingButton}
              variant="contained"
              color="primary"
            >
              Add Facility
            </Button>
          </Link>
        </div>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  facilities: state.facilities
});

const mapDispatchToProps = {
  getFacilities
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles, { withTheme: true })
)(withRouter(Facilities));
