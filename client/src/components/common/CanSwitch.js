import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import isEmpty from "../../validation/is-empty";

const CanSwitch = props => {
  const { roleSwitch, auth } = props;

  if (!auth.isAuthenticated) return null;
  if (isEmpty(roleSwitch[auth.user.role])) return null;

  return roleSwitch[auth.user.role];
};

const mapStateToProps = state => ({
  auth: state.auth
});

CanSwitch.propTypes = {
  roleSwitch: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  null
)(CanSwitch);
