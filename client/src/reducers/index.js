import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import snackReducer from "./snackReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  snack: snackReducer
});
