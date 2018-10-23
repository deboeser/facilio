import { SET_SNACK } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  open: false,
  type: "info",
  msg: "Initial snack",
  duration: 6000
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_SNACK:
      return {
        open: !isEmpty(action.payload.msg),
        type: isEmpty(action.payload.type) ? state.type : action.payload.type,
        msg: isEmpty(action.payload.msg) ? state.msg : action.payload.msg,
        duration: isEmpty(action.payload.duration)
          ? 6000
          : action.payload.duration
      };
    default:
      return state;
  }
}
