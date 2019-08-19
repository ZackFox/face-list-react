import { Reducer } from "redux";
import { CitiesState } from "./types";

import {
  CITIES_REQUEST,
  CITIES_SUCCESS,
  CITIES_FAILURE,
} from "../actions/citiesActions";

const initialState: CitiesState = {
  data: [],
  loading: false,
  error: null,
};

const cities: Reducer<CitiesState> = (state = initialState, action) => {
  switch (action.type) {
    case CITIES_REQUEST: {
      return { ...state, error: null, loading: true };
    }
    case CITIES_SUCCESS: {
      return { ...state, data: action.cities, loading: false };
    }
    case CITIES_FAILURE: {
      return { ...state, error: action.error, loading: false };
    }
    default:
      return state;
  }
};

export default cities;
