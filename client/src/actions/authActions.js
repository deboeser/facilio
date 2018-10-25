import axios from "axios";
import {
  GET_ERRORS,
  SET_AUTH_LOADING,
  SET_CURRENT_USER,
  RESET_ERRORS
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

const setLoading = () => {
  return { type: SET_AUTH_LOADING };
};

const registerUser = (userData, callback) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/auth/register", userData)
    .then(res => {
      callback();
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

const loginUser = (userData, callback) => dispatch => {
  dispatch(setLoading());
  axios
    .post("/api/auth/login", userData)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(setCurrentUser(decoded));
      dispatch({ type: RESET_ERRORS });
      callback();
    })
    .catch(err => {
      console.log(err);
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      });
    });
};

const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch({ type: SET_CURRENT_USER, payload: {} });
};

export { registerUser, loginUser, setLoading, setCurrentUser, logoutUser };
