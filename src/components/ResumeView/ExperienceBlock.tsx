import React from "react";

import { ExperienceItem } from "../../store/types";

interface ExperienceBlockProps {
  data: ExperienceItem;
}

const ExperienceBlock: React.FunctionComponent<ExperienceBlockProps> = ({
  data,
}) => {
  return (
    <div className="experience-item">
      <div className="experience-header">
        <h4 className="company-name">{data.name}</h4>
        <span className="experience-term">
          {` c ${new Date(data.dateStart).toLocaleDateString()} по ${
            data.dateEnd
              ? new Date(data.dateEnd).toLocaleDateString()
              : "текущее время"
          }`}
        </span>
      </div>
      <p className="experience-position">{data.position}</p>
    </div>
  );
};

export default ExperienceBlock;
