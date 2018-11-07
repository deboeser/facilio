import axios from "axios";
import { GET_FACILITIES, SET_FACILITIES_LOADING } from "../actions/types";

const setLoading = () => {
  return { type: SET_FACILITIES_LOADING };
};

const getFacilities = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/facility")
    .then(res => {
      dispatch({
        type: GET_FACILITIES,
        payload: res.data
      });
    })
    .catch(err => {
      // TODO: Proper handling if failed
      console.log(err.response.data);
    });
};

const deleteFacility = (id, callback) => dispatch => {
  console.log(id);
  dispatch(setLoading());
  axios
    .delete(`/api/facility/${id}`)
    .then(res => {
      console.log("success");
      getFacilities()(dispatch);
      if (typeof callback === "function") {
        callback();
      }
    })
    .catch(err => {
      // TODO: Proper handling if failed
      console.log(err.response.data);
    });
};

export { getFacilities, deleteFacility };
