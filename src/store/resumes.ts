import { Reducer, combineReducers } from "redux";

import { CurrentResumeState, ResumeListState } from "./types";
import { ResumeActions } from "../actions/types";

import {
  RESUME_REQUEST,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  RESUMELIST_REQUEST,
  RESUMELIST_SUCCESS,
  RESUME_UPDATE_OPTIMISTIC,
  RESUMELIST_FAILURE,
} from "../actions/resumeActions";

const initialListState: ResumeListState = {
  data: [],
  meta: { pages: 0 },
  loading: true,
};

const initialCurrentState: CurrentResumeState = {
  data: null,
  loading: true,
};

export const resumeList: Reducer<ResumeListState> = (
  state = initialListState,
  action,
): ResumeListState => {
  switch (action.type) {
    case RESUMELIST_REQUEST: {
      return { ...state, loading: true };
    }
    case RESUMELIST_SUCCESS: {
      return {
        ...state,
        data: action.list,
        meta: action.meta,
        loading: false,
      };
    }
    case RESUMELIST_FAILURE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
};

export const currentResume: Reducer<CurrentResumeState> = (
  state = initialCurrentState,
  action,
): CurrentResumeState => {
  switch (action.type) {
    case RESUMELIST_REQUEST: {
      return { ...state, data: null };
    }
    case RESUME_REQUEST: {
      return { ...state, loading: true };
    }
    case RESUME_SUCCESS: {
      return { ...state, data: action.resume, loading: false };
    }
    case RESUME_FAILURE: {
      return { ...state, loading: false };
    }
    case RESUME_UPDATE_OPTIMISTIC: {
      return { ...state, data: action.resume };
    }
    default:
      return state;
  }
};

export default combineReducers({
  current: currentResume,
  list: resumeList,
});
