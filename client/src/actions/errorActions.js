import { RESET_ERRORS } from "./types";

const resetErrors = () => dispatch => {
  dispatch({ type: RESET_ERRORS });
};

export { resetErrors };
