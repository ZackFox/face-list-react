import React, { useEffect, useState, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Resume, { User } from "../store/types";
import { AppState } from "../store";

import {
  getResume,
  updateResume,
  removeResume,
} from "../actions/resumeActions";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import ResumeForm from "../components/ResumeForm/ResumeForm";
import ResumeView from "../components/ResumeView/ResumeView";

interface ResumePageProps extends RouteComponentProps<{ id: string }> {
  user: User | null;
  resume: Resume | null;
  isLoggedIn: boolean;
  getResume: (id: number) => void;
  updateResume: (resume: Resume, callback: () => void) => void;
  removeResume: (id: number, redirect: () => void) => void;
}

const ResumePage: React.FunctionComponent<ResumePageProps> = props => {
  const {
    isLoggedIn,
    user,
    resume,
    getResume,
    updateResume,
    removeResume,
    match,
  } = props;

  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    const id = Number(match.params.id);
    getResume(id);
  }, []);

  const toggleEdit = () => setEdit(!isEdit);

  const submitlHandler = (resume: Resume) => {
    updateResume(resume, () => toggleEdit());
  };

  const deletelHandler = (id: number) => () => {
    removeResume(id, () => props.history.push("/"));
  };

  return (
    <div className="page resume-page">
      <div className="wrapper">
        {resume && (
          <button
            className="button btn-back"
            onClick={() => props.history.goBack()}
          >
            {"<< назад"}
          </button>
        )}
        {resume ? (
          isEdit ? (
            <ResumeForm
              {...resume}
              cancelHandler={toggleEdit}
              submitlHandler={submitlHandler}
            />
          ) : (
            <ResumeView
              user={user}
              resume={resume}
              onEdit={toggleEdit}
              deletelHandler={deletelHandler}
              isLoggedIn={isLoggedIn}
            />
          )
        ) : (
          <LoadingBox />
        )}
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    user: state.user.data,
    resume: state.resumes.current.data,
    isLoggedIn: state.user.isLoggedIn,
  }),
  { getResume, updateResume, removeResume },
)(ResumePage);
