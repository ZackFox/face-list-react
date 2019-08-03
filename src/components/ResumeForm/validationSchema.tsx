import * as Yup from "yup";

const schema = Yup.object().shape({
  firstname: Yup.string().required("*обязательное поле"),
  lastname: Yup.string().required("*обязательное поле"),
  email: Yup.string()
    .email("Некорректный адрес")
    .required("*обязательное поле"),
  phone: Yup.string().required("*обязательное поле"),
  position: Yup.string().required("*обязательное поле"),
  age: Yup.number()
    .min(14, "не меньше 14 лет")
    .required("*обязательное поле"),
  salary: Yup.string().required("*обязательное поле"),
  experience: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("*обязательное поле"),
      position: Yup.string().required("*обязательное поле"),
      dateStart: Yup.string()
        .nullable()
        .required("*обязательное поле"),
      dateEnd: Yup.string().nullable(),
    }),
  ),
  education: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("*обязательное поле"),
      speciality: Yup.string().required("*обязательное поле"),
      dateStart: Yup.string()
        .nullable()
        .required("*обязательное поле"),
      dateEnd: Yup.string()
        .nullable()
        .required("*обязательное поле"),
    }),
  ),
});

export default schema;
