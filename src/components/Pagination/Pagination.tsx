import React, { useState } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';

import { getRange } from '../../helpers/getRange';
import './Pagination.css';

interface PaginationProps extends RouteComponentProps<{ numPage: string }> {
  totalPages: number;
}

const Pagination: React.FunctionComponent<PaginationProps> = props => {
  const {
    totalPages,
    location: { search },
    match,
  } = props;

  const currentPage = +match.params.numPage;

  const isActive = (num: number) => {
    return currentPage === num ? 'pagination__link_active' : '';
  };

  return (
    <div className="pagination">
      {getRange(currentPage, totalPages).map((num, i) => {
        if (typeof num === 'number') {
          return (
            <Link
              className={`pagination__link ${isActive(num)}`}
              to={{ pathname: `/page/${num}`, search }}
              key={i}
            >
              <span className="link-text">{num}</span>
            </Link>
          );
        } else {
          return (
            <div key={i} className="pagination__link">
              <span className="link-text">{num}</span>
            </div>
          );
        }
      })}
    </div>
  );
};

export default withRouter(Pagination);
