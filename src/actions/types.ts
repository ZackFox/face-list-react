import { Action } from "redux";

import {
  RESUME_REQUEST,
  RESUME_SUCCESS,
  RESUME_FAILURE,
  RESUMELIST_REQUEST,
  RESUMELIST_SUCCESS,
  RESUMELIST_FAILURE,
  RESUME_CREATE,
  RESUME_DELETE,
} from "./resumeActions";

import Resume from "../store/types";

interface ResumeRequest extends Action<typeof RESUME_REQUEST> {}

interface ResumeFailure extends Action<typeof RESUME_FAILURE> {}

interface ResumeSuccess extends Action<typeof RESUME_SUCCESS> {
  resume: Resume;
  error?: ErrorEvent;
}

interface ResumeListRequest extends Action<typeof RESUMELIST_REQUEST> {}

interface ResumeListFailure extends Action<typeof RESUMELIST_FAILURE> {}

interface ResumeListSuccess extends Action<typeof RESUMELIST_SUCCESS> {
  data: Resume[];
  meta: { pages: number };
  error?: ErrorEvent;
}

interface ResumeCreate extends Action<typeof RESUME_CREATE> {
  resume: Resume;
}

interface ResumeDelete extends Action<typeof RESUME_DELETE> {
  resume: Resume;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegCredentials extends LoginCredentials{
  firstname: string;
  lastname: string;
}

export type ResumeActions =
  | ResumeRequest
  | ResumeSuccess
  | ResumeFailure
  | ResumeListRequest
  | ResumeListSuccess
  | ResumeListFailure
  | ResumeCreate
  | ResumeDelete;
