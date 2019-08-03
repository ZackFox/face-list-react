import React from "react";

import { EducationItem } from "../../store/types";

interface EducationBlockProps {
  data: EducationItem;
}

const EducationBlock: React.FunctionComponent<EducationBlockProps> = ({
  data,
}) => {
  return (
    <div className="education-item">
      <span className="education-term">
        {` ${new Date(data.dateStart).getFullYear()} — ${new Date(
          data.dateEnd,
        ).getFullYear()} `}
      </span>
      <span>{data.name}</span>

      <p>{data.speciality}</p>
    </div>
  );
};

export default EducationBlock;
