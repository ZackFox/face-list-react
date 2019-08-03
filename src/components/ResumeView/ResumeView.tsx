import React from "react";

import { numToWord } from "../../helpers/numToWord";
import Resume from "../../store/types";

import getExperienceTerm from "../../helpers/getExperienceTerm";
import EducationBlock from "./EducationBlock";
import ExperienceBlock from "./ExperienceBlock";
import "./ResumeView.css";

interface ResumeProps {
  resume: Resume;
  isLogined: boolean;
  onEdit: () => void;
  deletelHandler: (id: number) => () => void;
}

const about = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. 
Ducimus, recusandae. 
- Lorem ipsum dolor sit.
- Lorem ipsum dolor sit.
- Lorem ipsum dolor sit. 
- Lorem ipsum dolor sit. 
- Lorem ipsum dolor sit.
`;

const ResumeView: React.FunctionComponent<ResumeProps> = props => {
  const { isLogined, resume, onEdit, deletelHandler } = props;
  return (
    <div className="resume">
      <section className="resume-section resume-person">
        <div className="picture">
          <img src={resume.photo} alt="" />
        </div>
        <div className="details-group">
          <div className="d-left">
            <div className="person-details">
              <h3>{`${resume.firstname} ${resume.lastname}`}</h3>
              <span>{`
                ${resume.gender}, ${numToWord(resume.age)}, 
                г.${resume.city}
              `}</span>
            </div>
            <div className="person-contacts">
              <span>{`Email: ${resume.email}`}</span>
              <span>{`Телефон: ${resume.phone}`}</span>
            </div>
          </div>

          <div className="d-right">
            <h3 className="position">{resume.position}</h3>
            <div className="salary">{resume.salary}</div>
          </div>
        </div>
      </section>

      <section className="resume-section experience">
        <h3>
          Опыт работы
          <span className="full-experience">
            {`  ( ${getExperienceTerm(resume.experience)} )`}
          </span>
        </h3>
        {resume.experience.length
          ? resume.experience.map((exp, index) => (
              <ExperienceBlock data={exp} key={index} />
            ))
          : null}
      </section>

      <div className="resume-section education">
        <h3>Образование</h3>
        {resume.education.length > 0
          ? resume.education.map((ed, index) => (
              <EducationBlock data={ed} key={index} />
            ))
          : "не указано"}
      </div>

      <section className="resume-section about">
        <h3>О себе</h3>
        <div className="about-text">{about}</div>
      </section>

      {isLogined && (
        <div className="resume-button">
          <button className="button-edit" onClick={onEdit}>
            Редактировать
          </button>
          <button className="button-delete" onClick={deletelHandler(resume.id)}>
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeView;
