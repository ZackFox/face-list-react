import React, { useState } from 'react';
import { Link, withRouter, RouteComponentProps } from 'react-router-dom';

import './SearchBox.css';

interface SearchProps extends RouteComponentProps {}

const SearchBox: React.FunctionComponent<SearchProps> = props => {
  const { location, history } = props;
  const [input, setInput] = useState('');

  const searchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value || '');
  };

  const submitHandler = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    location.search = input ? `?position=${input}` : '';
    if (!location.pathname.includes('page/')) {
      history.push(`/page/1${location.search}`);
      return;
    }
    history.replace(`/page/1${props.location.search}`);
  };

  return (
    <div className="search-box">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="search-box__input"
          onChange={searchChange}
          value={input}
          placeholder="Я ищу..."
        />
        <input
          type="submit"
          className="btn search-box__btn"
          onClick={submitHandler}
          value="Найти"
        />
      </form>
    </div>
  );
};

export default withRouter(SearchBox);
