import React from "react";

import { EducationItem } from "../../store/resume/types";

interface ResumeListItemProps {
  data: EducationItem;
  changeHandler: (e: React.SyntheticEvent<HTMLInputElement>) => void;
}

const EdBlock: React.FunctionComponent<ResumeListItemProps> = ({
  data,
  changeHandler,
}) => {
  return (
    <div className="education-block">
      <input
        type="text"
        name="name"
        onChange={changeHandler}
        value={data.name}
      />
      <input
        type="text"
        name="degree"
        onChange={changeHandler}
        value={data.degree}
      />
    </div>
  );
};

export default EdBlock;
