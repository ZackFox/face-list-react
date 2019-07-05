import { Dispatch } from 'redux';
import apiClient from './apiClient';
import qs from 'query-string';

import {
  RESUME_REQUEST,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  RESUMELIST_REQUEST,
  RESUMELIST_SUCCESS,
  RESUMELIST_FAILURE,
  ADD_RESUME,
  DELETE_RESUME,
} from '../constants';

// import { resumes } from "../../api";

export const getResume = (id: number) => (dispatch: Dispatch<any>) => {
  dispatch({ type: RESUME_REQUEST });

  apiClient
    .get(`/api/v1/resumes/${id}`)
    .then(res => {
      console.log(res.data);
      dispatch({ type: RESUME_SUCCESS, resume: res.data.resume });
    })
    .catch(e => {
      dispatch({ type: RESUME_FAILURE, error: e });
    });
};

export const getResumesList = (numPage: number, query: string) => (
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: RESUMELIST_REQUEST });
  apiClient
    .get(`/api/v1/resumes?page=${numPage}&${query.slice(1)}`)
    .then(res => {
      dispatch({ type: RESUMELIST_SUCCESS, resumes: res.data.data });
    })
    .catch(e => {
      dispatch({ type: RESUMELIST_FAILURE, error: e });
    });
};
