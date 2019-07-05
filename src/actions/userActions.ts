import { Credentials } from './types';
import { Dispatch } from 'react';
import apiClient from './apiClient';
import cookies from 'js-cookie';
import axios from 'axios';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  LOGOUT,
} from '../constants';

export const login = (credentials: Credentials) => (
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: LOGIN_REQUEST });
  apiClient
    .post('/api/v1/auth/signin', credentials)
    .then(({ data }) => {
      cookies.set('token', data.accessToken);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch(error => {
      dispatch({ type: LOGIN_FAILURE, message: error.response.data.message });
    });
};

export const logout = () => (dispatch: Dispatch<any>) => {
  cookies.remove('token');
  dispatch({ type: LOGOUT });
};

export const getUser = () => (dispatch: Dispatch<any>) => {
  apiClient
    .get('/api/v1/auth/user')
    .then(({ data }) => {
      dispatch({ type: GET_USER_SUCCESS, user: data.user });
    })
    .catch(error => {
      console.log(error.response);
      cookies.remove('token');
      dispatch({ type: GET_USER_FAILURE, message: 'error' });
    });
};
