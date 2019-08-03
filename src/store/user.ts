import { Reducer } from "redux";
import { UserState } from "./types";
import cookies from "js-cookie";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from "../actions/userActions";

const token = cookies.get("token");

const initialState: UserState = {
  data: null,
  isLogined: !!token,
  loading: false,
  message: "",
};

export const user: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      return { ...state, data: action.user, loading: false };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        isLogined: false,
        message: action.message,
      };
    }
    case LOGIN_REQUEST: {
      return { ...state, loading: true, message: "" };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isLogined: true };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        isLogined: false,
        message: action.message,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        data: null,
        loading: false,
        isLogined: false,
      };
    }
    default:
      return state;
  }
};
