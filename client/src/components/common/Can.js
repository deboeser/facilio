import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Async from "react-promise";

import { hasMinimumRole, hasExactRole } from "../../roles/authenticateRole";
import { hierarchy } from "../../roles/roles";

const Can = props => {
  const { exact, auth, requiredRole, children } = props;
  const prom = exact
    ? hasExactRole(auth.user.role, requiredRole)
    : hasMinimumRole(auth.user.role, requiredRole);

  return (
    <Async
      promise={prom}
      then={hasRole => {
        return hasRole && children;
      }}
    />
  );
};

Can.propTypes = {
  requiredRole: PropTypes.oneOf(hierarchy).isRequired,
  exact: PropTypes.bool
};

Can.defaultProps = {
  exact: false
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(Can);
