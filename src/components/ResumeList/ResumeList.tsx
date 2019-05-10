import React, { useState } from "react";

import Resume from "../../store/resume/types";
import ResumeListItem from "../ResumeListItem/ResumeListItem";
import "./ResumeList.css";

interface ResumeProps {
  resumes: Resume[];
}

const ResumeList: React.FunctionComponent<ResumeProps> = ({ resumes }) => {
  if (resumes.length < 1) {
    return <p>список пуст</p>;
  }

  return (
    <div className="resume-list">
      {resumes.map((cv: Resume) => {
        return <ResumeListItem key={cv.id} resume={cv} />;
      })}
    </div>
  );
};

export default ResumeList;
