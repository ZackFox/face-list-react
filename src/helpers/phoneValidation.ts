export const phoneMask = [
  "+",
  "7",
  " ",
  "(",
  /[1-9]/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

export const checkPhone = (message: string) => (value: string) => {
  return value.search(/\+7\s\([1-9]\d{2}\)\s\d{3}-\d{2}-\d{2}/gi) !== -1
    ? undefined
    : message;
};
