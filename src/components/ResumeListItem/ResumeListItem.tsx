import React from "react";
import { Link } from "react-router-dom";

import Resume from "../../store/types";
import { numToWord } from "../../helpers/numToWord";

import "./ResumeListItem.css";
import getExperienceTerm from "../../helpers/getExperienceTerm";

interface ResumeListItemProps {
  resume: Resume;
}

const ResumeListItem: React.FunctionComponent<ResumeListItemProps> = ({
  resume,
}) => {
  return (
    <Link
      className="resume-list-item"
      to={`/resume/${resume.id}`}
      key={resume.id}
    >
      <div className="picture">
        <img src={resume.photo} alt="" />
      </div>
      <div className="person-container">
        <div className="p-left">
          <div className="person-info">
            <h4 className="person-name">
              {`${resume.firstname} ${resume.lastname}`}
            </h4>
            <span className="person-details">{`
                ${resume.gender}, ${numToWord(resume.age)}, 
                г.${resume.city}
              `}</span>
          </div>
          <div className="full-experience">
            <span>Опыт работы: </span>
            <span className="exp-term">
              {getExperienceTerm(resume.experience)}
            </span>
          </div>
        </div>
        <div className="p-right">
          <h3 className="position">{resume.position}</h3>
          <div className="salary">30 000 Руб.</div>
        </div>
      </div>
    </Link>
  );
};

export default ResumeListItem;
