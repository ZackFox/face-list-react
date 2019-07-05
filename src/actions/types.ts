import { Action } from 'redux';

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

import Resume from '../store/types';

interface ResumeRequest extends Action<typeof RESUME_REQUEST> {}

interface ResumeFailure extends Action<typeof RESUME_FAILURE> {}

interface ResumeSuccess extends Action<typeof RESUME_SUCCESS> {
  resume: Resume;
  error?: ErrorEvent;
}

interface ResumeListRequest extends Action<typeof RESUMELIST_REQUEST> {}

interface ResumeListFailure extends Action<typeof RESUMELIST_FAILURE> {}

interface ResumeListSuccess extends Action<typeof RESUMELIST_SUCCESS> {
  resumes: Resume[];
  error?: ErrorEvent;
}

interface ResumeAdd extends Action<typeof ADD_RESUME> {
  resume: Resume;
}

interface ResumeDelete extends Action<typeof DELETE_RESUME> {
  resume: Resume;
}

export interface Credentials {
  email: string;
  password: string;
}

export type ResumeActions =
  | ResumeRequest
  | ResumeSuccess
  | ResumeFailure
  | ResumeListRequest
  | ResumeListSuccess
  | ResumeListFailure
  | ResumeAdd
  | ResumeDelete;
