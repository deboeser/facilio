import { SET_SNACK } from "../actions/types";

const triggerSnack = snackData => dispatch => {
  dispatch({ type: SET_SNACK, payload: snackData });
};

export { triggerSnack };
