import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { hasMinimumRole, hasExactRole } from "../../roles/authenticateRole";
import { hierarchy } from "../../roles/roles";

class Can extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
    this.canSee = false;
  }

  componentDidMount = () => {
    const userRole = this.props.auth.user.role;
    const { requiredRole } = this.props;

    if (this.props.exact) {
      hasExactRole(userRole, requiredRole)
        .then(result => {
          this.canSee = result;
          this.setState({ loading: false });
        })
        .catch(err => this.setState({ loading: false }));
    } else {
      hasMinimumRole(userRole, requiredRole)
        .then(result => {
          this.canSee = result;
          this.setState({ loading: false });
        })
        .catch(err => this.setState({ loading: false }));
    }
  };

  render() {
    return <div>{this.canSee && this.props.children}</div>;
  }
}

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
