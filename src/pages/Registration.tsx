import React, { useEffect, useState, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

import { AppState } from "../store";

import { RegCredentials } from "../actions/types";
import { signUp } from "../actions/userActions";

import "./Registration.css";

interface RegistrationProps extends RouteComponentProps {
  signUp: (credentials: RegCredentials, redirect: () => void) => void;
}

const schema = Yup.object().shape({
  firstname: Yup.string().required("*обязательное поле"),
  lastname: Yup.string().required("*обязательное поле"),
  email: Yup.string()
    .email("Некорректный адрес")
    .required("*обязательное поле"),
  password: Yup.string()
    .min(5, "Минимум 5 символов")
    .required("*обязательное поле"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password")], "Пароль не совпадает")
    .required("*обязательное поле"),
});

const RegData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  passwordConfirm: "",
};

const Registration: React.FunctionComponent<RegistrationProps> = props => {
  const cancelHandler = (e: SyntheticEvent) => {
    e.preventDefault();
    props.history.goBack();
  };

  return (
    <div className="reg-page">
      <div className="wrapper">
        <Formik
          initialValues={RegData}
          validationSchema={schema}
          onSubmit={data => {
            props.signUp(data, () => props.history.push("/"));
          }}
        >
          {({ errors }) => {
            return (
              <div className="reg-form">
                <Form>
                  <div className="form-group">
                    <label htmlFor="firstname" className="field-label">
                      Имя*
                    </label>

                    <Field
                      id="firstname"
                      name="firstname"
                      className="field"
                      placeholder="Имя"
                    />
                    <ErrorMessage
                      name="firstname"
                      component="div"
                      className="field-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname" className="field-label">
                      Фамилия*
                    </label>

                    <Field
                      id="lastname"
                      name="lastname"
                      className="field"
                      placeholder="Фамилия"
                    />
                    <ErrorMessage
                      name="lastname"
                      component="div"
                      className="field-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email" className="field-label">
                      Email*
                    </label>
                    <Field
                      id="email"
                      className="field"
                      name="email"
                      placeholder="Email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="field-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="field-label">
                      Пароль*
                    </label>
                    <Field
                      id="password"
                      className="field"
                      name="password"
                      type="password"
                      placeholder="Пароль"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="field-error"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="passwordConfirm" className="field-label">
                      Подтверждение пароля*
                    </label>
                    <Field
                      id="passwordConfirm"
                      className="field"
                      name="passwordConfirm"
                      type="password"
                      placeholder="Подтверждение пароля"
                    />
                    <ErrorMessage
                      name="passwordConfirm"
                      component="div"
                      className="field-error"
                    />
                  </div>
                  <div className="reg-controls">
                    <button className="button btn-apply" type="submit">
                      Отправить
                    </button>
                    <button
                      className="button btn-reset"
                      onClick={cancelHandler}
                    >
                      Отмена
                    </button>
                  </div>
                </Form>
              </div>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default connect(
  (state: AppState) => ({ user: state.user.data }),
  { signUp },
)(Registration);
