import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { withStyles } from "@material-ui/core/styles";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import Grid from "@material-ui/core/Grid";

import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import ConfirmWarning from "../common/dialogs/ConfirmWarning";

import { deleteFacility } from "../../actions/facilityActions";

const styles = theme => ({
  root: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2
  },
  heading: {
    display: "inline-flex",
    flexGrow: 1
  },
  section: {
    display: "flex",
    flexGrow: 1
  },
  actions: {
    display: "inline-flex",
    flexGrow: 0
  },
  hidden: {
    visibility: "hidden"
  },
  chip: {
    marginRight: theme.spacing.unit
  }
});

class FacilityItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hover: false,
      deleteDialogOpen: false,
      anchorEl: null
    };
  }

  hoverOn = () => {
    this.setState({ hover: true });
  };

  hoverOff = () => {
    this.setState({ hover: false });
  };

  openDeleteDialog = () => {
    this.setState({ deleteDialogOpen: true });
  };

  closeDeleteDialog = () => {
    this.setState({ deleteDialogOpen: false });
  };

  handleOpenMenu = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { classes, facility } = this.props;
    const { anchorEl } = this.state;

    const more = (
      <div className={classes.actions}>
        <IconButton onClick={this.handleOpenMenu} className={classes.button}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleCloseMenu}
        >
          <MenuItem onClick={this.handleCloseMenu}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText inset primary="Edit Facility" />
          </MenuItem>
          <MenuItem onClick={this.openDeleteDialog}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText inset primary="Delete Facility" />
          </MenuItem>
        </Menu>
      </div>
    );

    const resources = facility.resources.map((item, key) => (
      <Chip label={item.name} key={key} className={classes.chip} />
    ));

    return (
      <div className={classes.root}>
        <ConfirmWarning
          open={this.state.deleteDialogOpen}
          dialogTitle={`Delete Facility ${this.props.facility.name}?`}
          dialogText={`Do you want to delete this facility? This cannot be undone.`}
          closeDialog={this.closeDeleteDialog.bind(this)}
          callbackCancel={() => {}}
          callbackConfirm={() => {
            this.props.deleteFacility(facility._id);
          }}
        />
        <Paper
          className={classes.paper}
          onMouseEnter={this.hoverOn}
          onMouseLeave={this.hoverOff}
        >
          <Grid container spacing={0}>
            <Grid item className={classes.section} xs={12}>
              <Typography variant="h5" className={classes.heading} gutterBottom>
                {facility.name}
              </Typography>
              {more}
            </Grid>
            <Grid item className={classes.section} xs={12}>
              {resources}
            </Grid>
          </Grid>
        </Paper>
      </div>
    );
  }
}

FacilityItem.propTypes = {
  facility: PropTypes.object.isRequired
};

const mapDispatchToProps = {
  deleteFacility
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    null,
    mapDispatchToProps
  )
)(FacilityItem);
