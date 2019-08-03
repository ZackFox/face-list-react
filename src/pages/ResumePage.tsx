import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import Resume from "../store/types";
import { AppState } from "../store";

import {
  getResume,
  updateResume,
  removeResume,
} from "../actions/resumeActions";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import ResumeForm from "../components/ResumeForm/ResumeForm";
import ResumeView from "../components/ResumeView/ResumeView";

interface ResumeProps {
  resume: Resume | null;
}

interface ResumePageProps extends RouteComponentProps<{ id: string }> {
  resume: Resume | null;
  isLogined: boolean;
  getResume: (id: number) => void;
  updateResume: (resume: Resume) => void;
  removeResume: (id: number, redirect: () => void) => void;
}

const ResumePage: React.FunctionComponent<ResumePageProps> = props => {
  const {
    isLogined,
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
    updateResume(resume);
  };

  const deletelHandler = (id: number) => () => {
    removeResume(id, () => props.history.push("/"));
  };

  return (
    <div className="page resume-page">
      <div className="wrapper">
        {resume ? (
          isEdit ? (
            <ResumeForm
              {...resume}
              cities={["Москва", "Санкт-петербург"]}
              cancelHandler={toggleEdit}
              submitlHandler={submitlHandler}
            />
          ) : (
            <ResumeView
              resume={resume}
              onEdit={toggleEdit}
              deletelHandler={deletelHandler}
              isLogined={isLogined}
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
    resume: state.resume.current,
    isLogined: state.user.isLogined,
  }),
  { getResume, updateResume, removeResume },
)(ResumePage);
