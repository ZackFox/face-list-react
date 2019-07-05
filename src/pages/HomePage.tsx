import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { connect } from 'react-redux';

import Resume from '../store/types';
import { AppState } from '../store';

import WithLoading from '../helpers/withLoading';
import { getResumesList } from '../actions/resumeActions';

import ResumeList from '../components/ResumeList/ResumeList';
import Filter from '../components/Filter/Filter';
import Pagination from '../components/Pagination/Pagination';

interface HomeProps extends RouteComponentProps<{ numPage: string }> {
  resumes: Resume[];
  loading: boolean;
  getResumesList: (numPage: number, querry: string) => void;
}

const HomePage: React.FunctionComponent<HomeProps> = props => {
  const { location, match, loading, resumes, getResumesList } = props;
  const search = location.search;
  const currentPage = +match.params.numPage;
  const [activePage, setActivePage] = useState();

  useEffect(() => {
    if (location.pathname === '/') {
      props.history.push(`page/1${location.search}`);
    }
    getResumesList(currentPage, location.search);
  }, [location.pathname, location.search]);

  const onChangePage = () => {};

  return (
    <React.Fragment>
      <div className="content-container">
        <section className="content">
          <ResumeList resumes={resumes} isLoad={!loading} />
          <Pagination totalPages={22} />
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
