import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Async from "react-promise";

import { hierarchy } from "../../roles/roles";
import { hasExactRole, hasMinimumRole } from "../../roles/authenticateRole";

const ProtectedRoute = ({
  component: Component,
  requiredRole,
  redirect,
  exact,
  auth,
  ...rest
}) => {
  if (!auth.isAuthenticated) {
    return <Route {...rest} render={() => <Redirect to="/login" />} />;
  }

  const returnRedirect = (
    <Route {...rest} render={() => <Redirect to={redirect} />} />
  );

  const prom = exact
    ? hasExactRole(auth.user.role, requiredRole)
    : hasMinimumRole(auth.user.role, requiredRole);

  return (
    <Async
      promise={prom}
      then={hasRole => {
        if (hasRole) {
          return <Route {...rest} render={props => <Component {...props} />} />;
        } else {
          return returnRedirect;
        }
      }}
    />
  );
};

ProtectedRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  requiredRole: PropTypes.oneOf(hierarchy).isRequired,
  exact: PropTypes.bool,
  redirect: PropTypes.string
};

ProtectedRoute.defaultProps = {
  exact: false,
  redirect: "/app"
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
