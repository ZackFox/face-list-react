import { Reducer } from "redux";
import { ResumeActions } from "../actions/types";
import { ResumeState } from "./types";

import {
  RESUME_REQUEST,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  RESUMELIST_REQUEST,
  RESUMELIST_SUCCESS,
  RESUMELIST_FAILURE,
  RESUME_CREATE,
  RESUME_DELETE,
} from "../actions/resumeActions";

const initialState: ResumeState = {
  current: null,
  list: {
    data: [],
    meta: { pages: 0 },
  },
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
      return { ...state, current: action.resume, loading: false };
    }
    case RESUME_FAILURE: {
      return { ...state, loading: false };
    }
    case RESUMELIST_REQUEST: {
      return { ...state, loading: true, current: null };
    }
    case RESUMELIST_SUCCESS: {
      return {
        ...state,
        loading: false,
        list: { data: action.data, meta: action.meta },
      };
    }
    case RESUMELIST_FAILURE: {
      return { ...state, loading: false };
    }
    // case RESUME_CREATE: {
    //   return { ...state, list: {...state.list [...state.list, action.resume]} };
    // }
    // case DELETE_RESUME: {
    //   const updated = [...state.list.data].filter(
    //     item => item.id !== action.resume.id,
    //   );
    //   return { ...state, list:{data updated }};
    // }
    default:
      return state;
  }
};
