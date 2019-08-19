import { LoginCredentials, RegCredentials } from "./types";
import { Dispatch } from "react";
import apiClient from "./apiClient";
import cookies from "js-cookie";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILURE = "GET_USER_FAILURE";

export const login = (credentials: LoginCredentials, reset: () => void) => (
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: LOGIN_REQUEST });
  apiClient
    .post("/api/v1/auth/signin", credentials)
    .then(({ data }) => {
      cookies.set("token", data.accessToken);
      dispatch({ type: LOGIN_SUCCESS, user: data.user });
    })
    .catch(error => {
      reset();
      dispatch({
        type: LOGIN_FAILURE,
        message: "Логин или пароль введен не верно",
      });
    });
};

export const signUp = (credentials: RegCredentials, redirect: () => void) => (
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: LOGIN_REQUEST });
  apiClient
    .post("/api/v1/auth/signUp", credentials)
    .then(({ data }) => {
      cookies.set("token", data.accessToken);
      dispatch({ type: LOGIN_SUCCESS, user: data.user });
      redirect();
    })
    .catch(error => {
      console.log(error);
    });
};

export const logout = () => (dispatch: Dispatch<any>) => {
  cookies.remove("token");
  dispatch({ type: LOGOUT });
};

export const getUser = () => (dispatch: Dispatch<any>) => {
  apiClient
    .get("/api/v1/auth/user")
    .then(({ data }) => {
      dispatch({ type: GET_USER_SUCCESS, user: data.user });
    })
    .catch(error => {
      cookies.remove("token");
      dispatch({
        type: GET_USER_FAILURE,
        message: "Ошибка авторизации. Попробуйте еще раз",
      });
    });
};
