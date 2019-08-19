import React from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { connect } from "react-redux";
import MaskedInput from "react-text-mask";

import Resume, { EducationItem, ExperienceItem } from "../../store/types";
import { AppState } from "../../store";
import { getCities } from "../../actions/citiesActions";

import FileBase64 from "./FileBase64";
import ExperienceForm from "./ExperienceForm";
import EducationForm from "./EducationForm";
import CustomSelect from "../CustomSelect/CustomSelect";
import { checkPhone, phoneMask } from "../../helpers/phoneValidation";
import schema from "./validationSchema";

import defaultAvatar from "../../assets/avatar.jpg";
import "./ResumeForm.css";

const toISOString = (value: string) => {
  if (!value) return null;
  const reg = /(\d{2})\/(\d{2})\/(\d{4})/gi;
  const date = new Date(String(value).replace(reg, "$3/$2/$1")).toISOString();
  return date;
};

const toTimestamp = (array: Array<any>) => {
  return array.map(el => {
    el.dateStart = toISOString(el.dateStart);
    el.dateEnd = toISOString(el.dateEnd);
    return el;
  });
};

interface ResumeProps {
  id: number;
  owner: number;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  city: string;
  phone: string;
  photo: string | null;
  position: string;
  salary: number;
  experience: ExperienceItem[];
  education: EducationItem[];
  about: string;
  cities: string[];
  getCities: () => void;
  cancelHandler: () => void;
  submitlHandler: (resume: Resume) => void;
}

class ResumeForm extends React.Component<ResumeProps> {
  componentDidMount() {
    if (!this.props.cities.length) {
      this.props.getCities();
    }
  }

  render() {
    const {
      cancelHandler,
      submitlHandler,
      cities,
      getCities,
      ...resume
    } = this.props;
    return (
      <div className="resume-form">
        <Formik
          initialValues={resume}
          validationSchema={schema}
          onSubmit={resume => {
            resume.education = toTimestamp(resume.education);
            resume.experience = toTimestamp(resume.experience);
            submitlHandler(resume);
          }}
        >
          {({ values, errors, setFieldValue }) => {
            return (
              <Form>
                <div className="form-section">
                  <h3>Основная информация</h3>
                  <div className="form-group">
                    <div className="avatar">
                      <div className="file-image">
                        <FileBase64
                          onDone={(file: string) =>
                            setFieldValue("photo", file)
                          }
                        />
                        <img
                          src={values.photo ? values.photo : defaultAvatar}
                          alt="avatar"
                        />
                        {values.photo && (
                          <button
                            className="image-remove-btn"
                            onClick={() => setFieldValue("photo", null)}
                          >
                            Убрать
                          </button>
                        )}
                      </div>
                      <p>
                        &#8592; Нажмите или перетащите файл, чтобы загрузить
                        изображение
                      </p>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname" className="field-label">
                      Имя*
                    </label>
                    <div className="field-block">
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname" className="field-label">
                      Фамилия*
                    </label>
                    <div className="field-block">
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender" className="field-label">
                      Пол*
                    </label>
                    <div className="field-block">
                      <CustomSelect
                        className="field"
                        initialValue={values.gender}
                        values={["мужчина", "женщина"]}
                        changeHandler={(value: string) =>
                          setFieldValue("gender", value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="city" className="field-label">
                      Город*
                    </label>
                    <div className="field-block">
                      <CustomSelect
                        className="field"
                        initialValue={values.city}
                        values={this.props.cities}
                        changeHandler={(value: string) =>
                          setFieldValue("city", value)
                        }
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="age" className="field-label">
                      Возраст*
                    </label>
                    <div className="field-block">
                      <Field
                        id="age"
                        type="number"
                        name="age"
                        className="field"
                      />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="field-error"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Контактные данные</h3>
                  <div className="form-group">
                    <label htmlFor="email" className="field-label">
                      Email*
                    </label>
                    <div className="field-block">
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
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone" className="field-label">
                      Телефон*
                    </label>
                    <div className="field-block">
                      <Field
                        id="phone"
                        name="phone"
                        validate={checkPhone("Неправильный номер")}
                        render={({ field }: any) => (
                          <MaskedInput
                            {...field}
                            type="text"
                            className="field"
                            mask={phoneMask}
                            placeholder="+7 (___) ___ __ __"
                            onChange={e =>
                              setFieldValue("phone", e.currentTarget.value)
                            }
                          />
                        )}
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="field-error"
                      />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>Специальность</h3>
                  <div className="form-group">
                    <label htmlFor="position" className="field-label">
                      Желаемая должность*
                    </label>
                    <div className="field-block">
                      <Field
                        id="position"
                        name="position"
                        className="field"
                        placeholder="Должность"
                      />
                      <ErrorMessage
                        name="position"
                        component="div"
                        className="field-error"
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="salary" className="field-label">
                      Зарплата*
                    </label>
                    <div className="field-block">
                      <Field
                        id="salary"
                        className="field"
                        name="salary"
                        type="number"
                        placeholder="Зарплата"
                      />
                      <ErrorMessage
                        name="salary"
                        component="div"
                        className="field-error"
                      />
                    </div>
                  </div>
                </div>

                <FieldArray name="experience">
                  {arrayHelper => (
                    <div className="form-section section-experience">
                      <h3>Опыт работы</h3>
                      <button
                        type="button"
                        className="add-group-btn"
                        onClick={() => arrayHelper.push(new ExperienceItem())}
                      >
                        добавить
                      </button>
                      <ExperienceForm
                        data={values.experience}
                        setValue={setFieldValue}
                        arrayHelper={arrayHelper}
                      />
                    </div>
                  )}
                </FieldArray>
                <FieldArray name="education">
                  {arrayHelper => (
                    <div className="form-section section-experience">
                      <h3>Образование</h3>
                      <button
                        type="button"
                        className="add-group-btn"
                        onClick={() => arrayHelper.push(new EducationItem())}
                      >
                        добавить
                      </button>
                      <EducationForm
                        data={values.education}
                        setValue={setFieldValue}
                        arrayHelper={arrayHelper}
                      />
                    </div>
                  )}
                </FieldArray>
                <div className="form-section">
                  <h3>О себе</h3>
                  <div className="field field-about">
                    <Field
                      id="about"
                      name="about"
                      value={values.about ? values.about : ""}
                      component="textarea"
                    />
                  </div>
                </div>
                <div className="form-controls">
                  <button className="button btn-apply" type="submit">
                    Сохранить
                  </button>
                  <button className="button btn-reset" onClick={cancelHandler}>
                    Отмена
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    );
  }
}

export default connect(
  (state: AppState) => ({
    cities: state.cities.data,
  }),
  { getCities },
)(ResumeForm);
