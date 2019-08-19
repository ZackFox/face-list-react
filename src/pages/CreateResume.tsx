import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

import { AppState } from "../store";
import Resume, { User } from "../store/types";

import ResumeForm from "../components/ResumeForm/ResumeForm";
import LoadingBox from "../components/LoadingBox/LoadingBox";

import { createResume } from "../actions/resumeActions";

interface CreateResumeProps extends RouteComponentProps {
  user: User | null;
  createResume: (data: Resume, redirect: (id: number) => void) => void;
}

const CreateResume: React.FunctionComponent<CreateResumeProps> = props => {
  const cancelHandler = () => {
    props.history.goBack();
  };

  const submitlHandler = (resume: Resume) => {
    props.createResume(resume, id => props.history.push(`/resume/${id}`));
  };

  return props.user ? (
    <ResumeForm
      id={0}
      owner={props.user.id}
      firstname={props.user.firstname}
      lastname={props.user.lastname}
      city="Москва"
      email={props.user.email}
      gender="мужчина"
      age={14}
      phone=""
      photo={null}
      position=""
      salary={10000}
      experience={[]}
      education={[]}
      about=""
      cancelHandler={cancelHandler}
      submitlHandler={submitlHandler}
    />
  ) : (
    <LoadingBox />
  );
};

export default connect(
  (state: AppState) => ({ user: state.user.data }),
  { createResume },
)(CreateResume);
