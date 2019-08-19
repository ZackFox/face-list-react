import { Dispatch } from "redux";

import apiClient from "./apiClient";
import { AppState } from "../store";
import Resume from "../store/types";

export const RESUMELIST_REQUEST = "RESUMELIST_REQUEST";
export const RESUMELIST_SUCCESS = "RESUMELIST_SUCCESS";
export const RESUMELIST_FAILURE = "RESUMELIST_FAILURE";

export const RESUME_REQUEST = "RESUME_REQUEST";
export const RESUME_SUCCESS = "RESUME_SUCCESS";
export const RESUME_FAILURE = "RESUME_FAILURE";

export const RESUME_CREATE = "RESUME_CREATE";
export const RESUME_UPDATE_OPTIMISTIC = "RESUME_UPDATE_OPTIMISTIC";
export const RESUME_DELETE = "RESUME_DELETE";

export const getResumesList = (numPage: number, query: string) => (
  dispatch: Dispatch<any>,
) => {
  dispatch({ type: RESUMELIST_REQUEST });
  apiClient
    .get(`/api/v1/resumes?page=${numPage}&${query.slice(1)}`)
    .then(({ data }) => {
      dispatch({ type: RESUMELIST_SUCCESS, list: data.data, meta: data._meta });
    })
    .catch(e => {
      dispatch({ type: RESUMELIST_FAILURE, error: e });
    });
};

export const getResume = (id: number) => (dispatch: Dispatch<any>) => {
  dispatch({ type: RESUME_REQUEST });

  apiClient
    .get(`/api/v1/resumes/${id}`)
    .then(({ data }) => {
      dispatch({ type: RESUME_SUCCESS, resume: data.data });
    })
    .catch(e => {
      dispatch({ type: RESUME_FAILURE, error: e });
    });
};

export const createResume = (
  resume: Resume,
  redirect: (id: number) => void,
) => (dispatch: Dispatch<any>) => {
  apiClient
    .post(`/api/v1/resumes`, resume)
    .then(({ data }) => {
      redirect(data.data.id);
    })
    .catch(e => {
      dispatch({ type: RESUME_FAILURE, error: e });
    });
};

export const updateResume = (nextResume: Resume, callback: () => void) => (
  dispatch: Dispatch,
  getState: () => AppState,
) => {
  const prevResume = getState().resumes.current.data;

  dispatch({ type: RESUME_UPDATE_OPTIMISTIC, resume: nextResume });
  callback();
  apiClient
    .put(`/api/v1/resumes`, nextResume)
    .catch(e => {
      dispatch({ type: RESUME_UPDATE_OPTIMISTIC, resume: prevResume });
    });
};

export const removeResume = (id: number, redirect: () => void) => (
  dispatch: Dispatch<any>,
) => {
  apiClient
    .delete(`/api/v1/resumes/${id}`)
    .then(() => redirect())
    .catch(e => {
      dispatch({ type: RESUME_FAILURE, error: e });
    });
};
