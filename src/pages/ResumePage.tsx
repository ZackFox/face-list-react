import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Resume from '../store/types';
import { AppState } from '../store';

import WithLoading from '../helpers/withLoading';
import { getResume } from '../actions/resumeActions';

import ResumeLayout from '../components/ResumeLayout/ResumeLayout';

interface ResumePageProps extends RouteComponentProps<{ id: string }> {
  resume: Resume | null;
  getResume: (id: number) => void;
}

const ResumePage: React.FunctionComponent<ResumePageProps> = props => {
  const { resume, match } = props;

  useEffect(() => {
    const id = Number(match.params.id);
    props.getResume(id);
  }, []);

  return <ResumeLayout resume={resume} />;
};

export default connect(
  (state: AppState) => ({
    resume: state.resume.current,
  }),
  { getResume },
)(ResumePage);
