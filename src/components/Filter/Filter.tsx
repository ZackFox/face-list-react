import React, { SyntheticEvent } from 'react';
import { RouteComponentProps, withRouter } from 'react-router';
import qs from 'query-string';

import './Filter.css';

interface FilterState {
  gender: string;
  city: string;
  [key: string]: string;
}

class Filter extends React.Component<RouteComponentProps, FilterState> {
  static state = { city: '', gender: '' };

  changeFilter = (e: SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  onSubmit = () => {
    const query = { ...qs.parse(location.search), ...this.state };
    const params = Object.keys(query);
    for (let p of params) {
      if (query[p] === '') delete query[p];
    }
    this.props.history.replace(`${location.pathname}?${qs.stringify(query)}`);
  };

  render() {
    return (
      <div className="filter">
        <div className="filter-group">
          <div className="filter-group__title">Город</div>
          <select
            name="city"
            className="filter-group__select"
            onChange={this.changeFilter}
          >
            <option selected />
            <option value="москва">Москва</option>
            <option value="минск">Минск</option>
          </select>
        </div>

        <div className="filter-group">
          <div className="filter-group__title">Пол</div>
          <select
            name="gender"
            className="filter-group__select"
            onChange={this.changeFilter}
          >
            <option selected />
            <option value="мужчина">Мужчина</option>
            <option value="женщина">Женщина</option>
          </select>
        </div>

        <button onClick={this.onSubmit}>Применить</button>
      </div>
    );
  }
}

export default withRouter(Filter);
