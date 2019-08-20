import React from "react";

import { numToWord } from "../../helpers/numToWord";
import Resume, { User } from "../../store/types";

import getExperienceTerm from "../../helpers/getExperienceTerm";
import EducationBlock from "./EducationBlock";
import ExperienceBlock from "./ExperienceBlock";

import defaultAvatar from "../../assets/avatar.jpg";
import "./ResumeView.css";

interface ResumeProps {
  user: User | null;
  resume: Resume;
  isLoggedIn: boolean;
  onEdit: () => void;
  deletelHandler: (id: number) => () => void;
}

const ResumeView: React.FunctionComponent<ResumeProps> = props => {
  const { isLoggedIn, user, resume, onEdit, deletelHandler } = props;
  return (
    <div className="resume">
      <section className="resume-section resume-person">
        <div className="picture">
          <img src={resume.photo ? resume.photo : defaultAvatar} alt="" />
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
        <h3 className="heading">
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

      <section className="resume-section education">
        <h3 className="heading">Образование</h3>
        {resume.education.length > 0
          ? resume.education.map((ed, index) => (
              <EducationBlock data={ed} key={index} />
            ))
          : "не указано"}
      </section>

      {resume.about &&  <section className="resume-section about">
        <h3 className="heading" >О себе</h3>
        <div className="about-text">{resume.about}</div>
      </section>}

      {isLoggedIn && user && user.id === resume.owner && (
        <div className="resume-controls">
          <button className="button btn-apply" onClick={onEdit}>
            Редактировать
          </button>
          <button
            className="button btn-reset"
            onClick={deletelHandler(resume.id)}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};

export default ResumeView;
