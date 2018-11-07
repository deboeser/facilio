import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Button from "../../common/Button";

import isEmpty from "../../../validation/is-empty";

const styles = theme => ({
  confirmBtn: {
    backgroundColor: theme.palette.warning[600],
    marginRight: theme.spacing.unit * 2,
    "&:hover": {
      backgroundColor: theme.palette.warning[800]
    }
  },
  actions: {
    paddingBottom: theme.spacing.unit
  }
});

class ConfirmWarning extends Component {
  handleClose = callback => () => {
    this.props.closeDialog();
    callback();
  };

  render() {
    const {
      classes,
      dialogText,
      dialogTitle,
      buttonTextCancel,
      buttonTextConfirm,
      callbackCancel,
      callbackConfirm,
      open
    } = this.props;

    return (
      <div>
        <Dialog open={open} onClose={this.handleClose(callbackCancel)}>
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogText}
            </DialogContentText>
          </DialogContent>
          <DialogActions className={classes.actions}>
            <Button onClick={this.handleClose(callbackCancel)} color="default">
              {!isEmpty(buttonTextCancel) ? buttonTextCancel : "Cancel"}
            </Button>
            <Button
              className={classes.confirmBtn}
              onClick={this.handleClose(callbackConfirm)}
              color="primary"
              variant="contained"
              autoFocus
            >
              {!isEmpty(buttonTextConfirm) ? buttonTextConfirm : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmWarning.propTypes = {
  open: PropTypes.bool.isRequired,
  dialogTitle: PropTypes.string.isRequired,
  dialogText: PropTypes.string.isRequired,
  closeDialog: PropTypes.func.isRequired,
  callbackCancel: PropTypes.func.isRequired,
  callbackConfirm: PropTypes.func.isRequired,
  buttonTextCancel: PropTypes.string,
  buttonTextConfirm: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(ConfirmWarning);
