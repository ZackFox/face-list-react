import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, withRouter } from "react-router";
import qs from "query-string";

import { AppState } from "../../store";
import { getCities } from "../../actions/citiesActions";

import CustomSelect from "../CustomSelect/CustomSelect";
import "./Filter.css";

interface FilterProps extends RouteComponentProps {
  cities: string[];
  getCities: () => void;
}

const getQuery = (state: any) => {
  const query: any = { ...qs.parse(location.search), ...state };
  const params = Object.keys(query);
  for (let p of params) {
    if (query[p] === "") delete query[p];
  }
  return query;
};

const Filter: React.FunctionComponent<FilterProps> = props => {
  const [city, setCity] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    if (!props.cities.length) {
      props.getCities();
    }
  }, []);

  const onReset = () => {
    setCity("");
    setGender("");
    const query = getQuery({ city: "", gender: "" });
    props.history.replace(`${location.pathname}?${qs.stringify(query)}`);
  };

  const onSubmit = () => {
    const query = getQuery({ city, gender });
    props.history.replace(`${location.pathname}?${qs.stringify(query)}`);
  };

  return (
    <aside className="sidebar">
      <div className="filters">
        <div className="filter-group">
          <div className="filter-group__title">Город</div>
          <CustomSelect
            className="filter-group__select"
            initialValue={city}
            defaultOption={"--любой--"}
            values={props.cities}
            changeHandler={(value: string) => setCity(value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-group__title">Пол</div>
          <CustomSelect
            className="filter-group__select"
            initialValue={gender}
            defaultOption={"--любой--"}
            values={["мужчина", "женщина"]}
            changeHandler={(value: string) => setGender(value)}
          />
        </div>
      </div>
      <div className="filter-controls">
        <button className="button btn-apply" onClick={onSubmit}>Применить</button>
        <button className="button btn-reset" onClick={onReset}>Сбросить</button>
      </div>
    </aside>
  );
};

export default withRouter(
  connect(
    (state: AppState) => ({ cities: state.cities.data }),
    { getCities },
  )(Filter),
);
