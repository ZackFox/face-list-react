import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";

import Resume from "../store/types";
import { AppState } from "../store";

import { getResumesList } from "../actions/resumeActions";

import ResumeList from "../components/ResumeList/ResumeList";
import Filter from "../components/Filter/Filter";
import Pagination from "../components/Pagination/Pagination";
import LoadingBox from "../components/LoadingBox/LoadingBox";
import SideBar from "../components/Filter/Filter";

interface HomeProps extends RouteComponentProps<{ numPage: string }> {
  resumes: Resume[];
  meta: { pages: number };
  loading: boolean;
  getResumesList: (numPage: number, querry: string) => void;
}

const HomePage: React.FunctionComponent<HomeProps> = props => {
  const { location, match, loading, resumes, getResumesList, meta } = props;
  const currentPage = +match.params.numPage;

  useEffect(() => {
    if (location.pathname === "/") {
      props.history.push(`page/1${location.search}`);
    }
    getResumesList(currentPage, location.search);
  }, [location.pathname, location.search]);

  return (
    <div className="page home-page">
      <div className="wrapper">
        {loading && <LoadingBox />}
        <div className="content-container">
          <section className="content">
            <ResumeList resumes={resumes} isLoad={!loading} />
            {meta.pages > 1 ? (
              <Pagination totalPages={props.meta.pages} />
            ) : null}
          </section>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({
    resumes: state.resumes.list.data,
    meta: state.resumes.list.meta,
    loading: state.resumes.list.loading,
  }),
  { getResumesList },
)(HomePage);
