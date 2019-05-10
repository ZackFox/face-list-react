import React from "react";
import { Link } from "react-router-dom";

import Resume from "../../store/resume/types";
import { numToAge } from "../../helpers/numToAge";

import "./ResumeListItem.css";

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
      <div className="list-item-picture">
        <img src={resume.photo} alt="" />
      </div>
      <div className="list-item-info">
        <h3>{resume.position}</h3>
        <div className="user-info">
          <span>{`${resume.firstname} ${resume.lastname}, 
            ${resume.sex}, ${numToAge(resume.age, ["год", "года", "лет"])},
            ${resume.city}`}</span>
        </div>
      </div>
    </Link>
  );
};

export default ResumeListItem;
