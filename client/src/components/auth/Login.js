import React from "react";
import SingleDialog from "../common/SingleDialog";

import LoginForm from "./LoginForm";

const Login = props => {
  return (
    <SingleDialog>
      <LoginForm />
    </SingleDialog>
  );
};

export default Login;
