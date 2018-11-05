import { GET_FACILITIES, SET_FACILITIES_LOADING } from "../actions/types";
import isEmpty from "../validation/is-empty";

const initialState = {
  facilities: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_FACILITIES_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_FACILITIES:
      return {
        ...state,
        facilities: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
