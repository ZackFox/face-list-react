import { Dispatch } from "react";

export const CITIES_REQUEST = "CITIES_REQUEST";
export const CITIES_SUCCESS = "CITIES_SUCCESS";
export const CITIES_FAILURE = "CITIES_FAILURE";

const cities = [
  "Москва",
  "Санкт-Петербург",
  "Новосибирск",
  "Екатеринбург",
  "Челябинск",
];

export const getCities = () => (dispatch: Dispatch<any>) => {
  dispatch({ type: CITIES_REQUEST });
  const fakeFetch = new Promise((res, rej) => {
    setTimeout(() => res(cities), 800);
  });
  fakeFetch.then(data => {
    dispatch({ type: CITIES_SUCCESS, cities: data });
  });
};
