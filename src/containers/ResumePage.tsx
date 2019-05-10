import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

import { AppState } from "../store";
import { getResume } from "../actions/resume/actions";

import Resume from "../store/resume/types";
import ResumeLayout from "../components/ResumeLayout/ResumeLayout";
import WithLoading from "../helpers/withLoading";

interface ResumePageProps extends RouteComponentProps<{ id: string }> {
  resume: Resume | null;
  loading: boolean;
  getResume: (id: number) => void;
}

const ResumePage: React.FunctionComponent<ResumePageProps> = props => {
  const { resume, loading, match } = props;

  useEffect(() => {
    console.log(props);
    const id = Number(match.params.id);
    props.getResume(id);
  }, []);

  return (
    <WithLoading loading={loading}>
      <ResumeLayout resume={resume} />
    </WithLoading>
  );
};

export default connect(
  (state: AppState) => ({
    resume: state.resume.current,
    loading: state.resume.loading,
  }),
  { getResume },
)(ResumePage);
