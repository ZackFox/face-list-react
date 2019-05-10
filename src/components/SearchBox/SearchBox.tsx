import React, { useState } from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

import "./SearchBox.css";

interface SearchProps extends RouteComponentProps {}

const SearchBox: React.FunctionComponent<SearchProps> = props => {
  const [search, setSearch] = useState("");

  const searchChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    setSearch(e.currentTarget.value || "");
  };

  const submitHandler = (e: React.SyntheticEvent<any>) => {
    e.preventDefault();
    props.location.search = search ? `?search=${search}` : "";
    if (!props.location.pathname.includes("page")) {
      props.history.push(`/page/1${props.location.search}`);
      return;
    }
    props.history.replace(`/page/1${props.location.search}`);
  };

  return (
    <div className="search-box">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          className="search-box__input"
          onChange={searchChange}
          value={search}
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
