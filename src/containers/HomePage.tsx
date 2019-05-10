import React, { useEffect } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import Resume from "../store/resume/types";
import { getResumesList } from "../actions/resume/actions";
import { RouteComponentProps } from "react-router";
import WithLoading from "../helpers/withLoading";

import ResumeList from "../components/ResumeList/ResumeList";
import Filter from "../components/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";

interface HomeProps extends RouteComponentProps {
  resumes: Resume[];
  loading: boolean;
  getResumesList: (querry: string) => void;
}

const HomePage: React.FunctionComponent<HomeProps> = props => {
  const { loading, resumes, location, getResumesList } = props;

  useEffect(() => {
    if (location.pathname === "/") {
      props.history.push(`page/1${location.search}`);
    }
    getResumesList(location.search);
  }, [location.pathname, location.search]);

  return (
    <React.Fragment>
      <div className="content-container">
        <section className="content">
          <WithLoading loading={loading}>
            <React.Fragment>
              <ResumeList resumes={resumes} />
              <Pagination />
            </React.Fragment>
          </WithLoading>
        </section>
        <aside className="sidebar">
          <Filter />
        </aside>
      </div>
    </React.Fragment>
  );
};

export default connect(
  (state: AppState) => ({
    resumes: state.resume.list,
    loading: state.resume.loading,
  }),
  { getResumesList },
)(HomePage);
