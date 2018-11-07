import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import snackReducer from "./snackReducer";
import facilityReducer from "./facilityReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  snack: snackReducer,
  facilities: facilityReducer
});
