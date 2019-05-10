import { Reducer } from "redux";
import { ResumeActions } from "../../actions/resume/types";
import { ResumeState } from "./types";

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

const initialState: ResumeState = {
  current: null,
  list: [],
  loading: true,
  errors: "",
};

export const resume: Reducer<ResumeState, ResumeActions> = (
  state = initialState,
  action,
): ResumeState => {
  switch (action.type) {
    case RESUME_REQUEST: {
      return { ...state, loading: true };
    }
    case RESUME_SUCCESS: {
      return { ...state, loading: false, current: action.resume };
    }
    case RESUME_FAILURE: {
      return { ...state, loading: false };
    }
    case RESUMELIST_REQUEST: {
      return { ...state, loading: true, current: null };
    }
    case RESUMELIST_SUCCESS: {
      return { ...state, loading: false, list: action.resumes };
    }
    case RESUMELIST_FAILURE: {
      return { ...state, loading: false };
    }
    case ADD_RESUME: {
      return { ...state, list: [...state.list, action.resume] };
    }
    case DELETE_RESUME: {
      const updated = [...state.list].filter(
        item => item.id !== action.resume.id,
      );
      return { ...state, list: updated };
    }
    default:
      return state;
  }
};
