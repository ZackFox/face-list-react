import { Dispatch } from "redux";
import qs from "query-string";

import {
  RESUME_REQUEST,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  RESUMELIST_REQUEST,
  RESUMELIST_SUCCESS,
  RESUMELIST_FAILURE,
  ADD_RESUME,
  DELETE_RESUME,
} from "../../constants";

import { resumes } from "../../api";

export const getResume = (id: number) => (dispatch: Dispatch<any>) => {
  dispatch({ type: RESUME_REQUEST });
  const resume = resumes.filter(item => item.id === id)[0];

  const response = new Promise((res, rej) => {
    setTimeout(() => {
      res(resume);
    }, 1000);
  });

  response
    .then(res => {
      dispatch({ type: RESUME_SUCCESS, resume: res });
    })
    .catch(e => {
      dispatch({ type: RESUME_FAILURE, error: e });
    });
};

export const getResumesList = (query: string) => (dispatch: Dispatch<any>) => {
  const parsed = qs.parse(query);
  console.log(parsed);

  dispatch({ type: RESUMELIST_REQUEST });

  const response = new Promise((res, rej) => {
    setTimeout(() => {
      res(resumes);
    }, 1000);
  });

  response
    .then(res => {
      dispatch({ type: RESUMELIST_SUCCESS, resumes: res });
    })
    .catch(e => {
      dispatch({ type: RESUMELIST_FAILURE, error: e });
    });
};
