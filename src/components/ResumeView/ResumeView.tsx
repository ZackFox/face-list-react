import React from "react";

import { numToAge } from "../../helpers/numToAge";
import Resume from "../../store/resume/types";

import "./ResumeView.css";

interface ResumeProps {
  resume: Resume;
  onEdit: () => void;
}

const ResumeView: React.FunctionComponent<ResumeProps> = ({
  resume,
  onEdit,
}) => {
  const { experience, education } = resume;

  return (
    <div className="resume-page">
      <div className="user-section">
        <div className="picture">
          <img src={resume.photo} alt="" />
        </div>
        <div className="person">
          <div className="user-position">
            <h3>{resume.position}</h3>
          </div>
          <div className="user-info">
            <span>{`
              ${resume.firstname} ${resume.lastname}, 
              ${resume.sex}, ${numToAge(resume.age, ["год", "года", "лет"])}, 
              ${resume.city}
            `}</span>
          </div>
          <div className="user-contacts">
            <span>{`Email: ${resume.email}`}</span>
            <span>{`Телефон: ${resume.phone}`}</span>
          </div>
        </div>
      </div>

      {experience.length > 0 && (
        <div className="experience">
          <h3>Опыт работы</h3>
        </div>
      )}

      {education.length > 0 && (
        <div className="education">
          <h3>Образование</h3>

          {education.map((ed, index) => {
            return (
              <div className="edu-item" key={index}>
                {ed.degree}
              </div>
            );
          })}
        </div>
      )}

      <div className="about">
        <h3>О себе</h3>
        {resume.about}
      </div>

      <div className="resume-button">
        <button className="button-edit" onClick={onEdit}>
          Редактировать
        </button>
        <button className="button-delite">Удалить</button>
      </div>
    </div>
  );
};

export default ResumeView;
