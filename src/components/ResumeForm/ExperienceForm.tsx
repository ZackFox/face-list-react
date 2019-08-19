import React from "react";
import { Field, ArrayHelpers, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";

import { ExperienceItem } from "../../store/types";

import "react-datepicker/dist/react-datepicker.css";

interface ExperienceFormProps {
  data: ExperienceItem[];
  setValue: (field: string, value: any) => void;
  arrayHelper: ArrayHelpers;
}

const ExperienceForm: React.FunctionComponent<ExperienceFormProps> = (
  props,
): any => {
  const { data, setValue, arrayHelper } = props;

  const isValid = (value: any) => {
    const currentlyCount = data.reduce((count, el) => {
      if (!el.dateEnd) count++;
      return count;
    }, 0);
    if (currentlyCount > 1) {
      return "текущее место работы уже указано";
    }
  };

  return data && data.length > 0
    ? data.map((exp, i) => (
        <div className="form-experience" key={i}>
          <div className="form-group">
            <label htmlFor={`experience[${i}].name`} className="field-label">
              Название компании*
            </label>
            <div className="field-block">
              <Field
                id={`experience[${i}].name`}
                className="field"
                name={`experience[${i}].name`}
              />

              <ErrorMessage
                name={`experience[${i}].name`}
                component="div"
                className="field-error"
              />
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor={`experience[${i}].position`}
              className="field-label"
            >
              Должность*
            </label>
            <div className="field-block">
              <Field
                id={`experience[${i}].position`}
                className="field"
                name={`experience[${i}].position`}
              />
              <ErrorMessage
                name={`experience[${i}].position`}
                component="div"
                className="field-error"
              />
            </div>
          </div>

          <div className="form-group">
            <label
              htmlFor={`experience[${i}].dateStart`}
              className="field-label"
            >
              Начало работы*
            </label>
            <div className="field-block">
              <DatePicker
                selected={
                  data[i].dateStart ? new Date(data[i].dateStart) : null
                }
                name={`experience[${i}].dateStart`}
                className="field"
                placeholderText="дд/мм/гггг"
                onChange={value =>
                  setValue(`experience[${i}].dateStart`, value)
                }
              />

              <ErrorMessage
                name={`experience[${i}].dateStart`}
                component="div"
                className="field-error"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor={`experience[${i}].dateEnd`} className="field-label">
              Окончание
              <div className="label-span">Оставьте поле пустым если продолжаете работать</div>
            </label>
            <div className="field-block">
              <DatePicker
                selected={data[i].dateEnd ? new Date(data[i].dateEnd) : null}
                name={`experience[${i}].dateEnd`}
                className="field"
                placeholderText="по текущее время"
                onChange={value => setValue(`experience[${i}].dateEnd`, value)}
              />
              <ErrorMessage
                name={`experience[${i}].dateEnd`}
                component="div"
                className="field-error"
              />
            </div>
          </div>

          <div className="form-group form-text">
            <label
              htmlFor="experience.${i}.description"
              className="field-label"
            >
              Описание
            </label>
            <div className="field-block">
              <Field
                name={`experience.${i}.description`}
                className="field"
                component="textarea"
                value={data[i] && data[i].description ? data[i].description: ""}
              />
            </div>
          </div>

          <button
            type="button"
            className="remove-group-btn"
            onClick={() => arrayHelper.remove(i)}
          >
            удалить
          </button>
        </div>
      ))
    : null;
};

export default ExperienceForm;
