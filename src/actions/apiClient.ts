import { createBrowserHistory } from "history";
import axios, { AxiosRequestConfig } from "axios";
import cookies from "js-cookie";
import store from "../store";
import { LOGOUT, logout } from "./userActions";

const apiClient = axios.create();

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = cookies.get("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => Promise.reject(err),
);

apiClient.interceptors.response.use(
  response => response,
  err => {
    if (err.response && err.response.status === 401) {
      logout()(store.dispatch);
    }
    return Promise.reject(err.response);
  },
);

export default apiClient;
