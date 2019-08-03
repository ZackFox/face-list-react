import React, { useState } from 'react';

import Resume from '../../store/types';
import ResumeListItem from '../ResumeListItem/ResumeListItem';
import './ResumeList.css';

interface ResumeProps {
  resumes: Resume[];
  isLoad: boolean;
}

const ResumeList: React.FunctionComponent<ResumeProps> = ({
  resumes,
  isLoad,
}) => {
  if (isLoad && resumes.length === 0) {
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
