import { Reducer } from "redux";
import { UserState, User } from "./types";
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
  isLoggedIn: !!token,
  loading: false,
  message: "",
};

const user: Reducer<UserState> = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCESS: {
      return { ...state, data: action.user, loading: false };
    }
    case GET_USER_FAILURE: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        message: action.message,
      };
    }
    case LOGIN_REQUEST: {
      return { ...state, loading: true, message: "" };
    }
    case LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true, data: action.user, loading: false };
    }
    case LOGIN_FAILURE: {
      return {
        ...state,
        loading: false,
        isLoggedIn: false,
        message: action.message,
      };
    }
    case LOGOUT: {
      return {
        ...state,
        data: null,
        loading: false,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default user;