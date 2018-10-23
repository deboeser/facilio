import { GET_ERRORS, RESET_ERRORS } from "../actions/types";

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    case RESET_ERRORS:
      return {};
    default:
      return state;
  }
};

export default errorReducer;
