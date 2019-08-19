import React from "react";

import "./CustomSelect.css";

const CustomSelect = React.memo((props: any) => {
  const { initialValue, values, defaultOption, changeHandler, ...rest } = props;

  return (
    <select
      {...rest}
      value={initialValue}
      onChange={e => changeHandler(e.currentTarget.value)}
    >
      {!values.length && <option>...загрузка...</option>}
      {defaultOption && <option value={""}> {defaultOption}</option>}

      {values.length &&
        values.map((val: any, index: number) => (
          <option key={index} value={val}>
            {val}
          </option>
        ))}
    </select>
  );
});

export default CustomSelect;
