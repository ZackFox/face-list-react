import React from "react";
import { Field, ArrayHelpers, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";

import { EducationItem } from "../../store/types";

import "react-datepicker/dist/react-datepicker.css";

interface EducationFormProps {
  data: EducationItem[];
  setValue: (field: string, value: any) => void;
  arrayHelper: ArrayHelpers;
}

const EducationForm: React.FunctionComponent<EducationFormProps> = ({
  data,
  setValue,
  arrayHelper,
}): any => {
  return (
    data.length > 0 &&
    data.map((exp, i) => (
      <div className="form-education" key={i}>
        <div className="form-group">
          <label htmlFor={`education[${i}].name`} className="field-label">
            Учебное заведение*
          </label>
          <div className="field-block">
            <Field
              id={`education[${i}].name`}
              className="field"
              name={`education[${i}].name`}
            />
            <ErrorMessage
              name={`education[${i}].name`}
              component="div"
              className="field-error"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`education[${i}].speciality`} className="field-label">
            Специализация*
          </label>
          <div className="field-block">
            <Field
              id={`education[${i}].speciality`}
              name={`education[${i}].speciality`}
              className="field"
            />
            <ErrorMessage
              name={`education[${i}].speciality`}
              component="div"
              className="field-error"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="education.${i}.dateStart" className="field-label">
            Начало обучения*
          </label>
          <div className="field-block">
            <Field
              id={`education[${i}].dateStart`}
              name={`education[${i}].dateStart`}
              render={({ field }: any) => (
                <DatePicker
                  className="field"
                  selected={field.value && new Date(field.value)}
                  onChange={value =>
                    setValue(`education[${i}].dateStart`, value)
                  }
                />
              )}
            />
            <ErrorMessage
              name={`education[${i}].dateStart`}
              component="div"
              className="field-error"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor={`education[${i}].dateEnd`} className="field-label">
            Окончание*
          </label>
          <div className="field-block">
            <Field
              id={`education[${i}].dateEnd`}
              name={`education[${i}].dateEnd`}
              render={({ field }: any) => {
                return (
                  <DatePicker
                    className="field"
                    selected={field.value && new Date(field.value)}
                    onChange={value =>
                      setValue(`education[${i}].dateEnd`, value)
                    }
                  />
                );
              }}
            />
            <ErrorMessage
              name={`education[${i}].dateEnd`}
              component="div"
              className="field-error"
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
  );
};

export default EducationForm;
