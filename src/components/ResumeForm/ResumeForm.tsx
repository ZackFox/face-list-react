import React, { Component } from "react";
import { connect } from "react-redux";

import Resume, { EducationItem } from "../../store/resume/types";
import EdBlock from "../EdBlock/EdBlock";

interface ResumeProps {
  resume: Resume;
  onCancel: () => void;
}

class ResumeForm extends Component<ResumeProps, Resume> {
  static defaultProps: ResumeProps = {
    resume: {
      id: 0,
      owner: 0,
      firstname: "",
      lastname: "",
      photo: "",
      sex: "Мужчина",
      age: 18,
      city: "",
      position: "",
      email: "",
      phone: "",
      experience: [],
      education: [],
      skills: [],
      about: "",
    },
    onCancel: () => {},
  };

  constructor(props: ResumeProps) {
    super(props);
    this.state = { ...this.props.resume };
  }

  addEdBlock = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newArr = [...this.state.education];
    newArr.push(new EducationItem());
    this.setState({ education: newArr });
  };

  textChange = (
    e: React.SyntheticEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  groupChange = (group: "experience" | "education", index: number) => (
    e: React.SyntheticEvent<HTMLInputElement>,
  ) => {
    const copyArr = [...this.state[group]];
    copyArr[index][e.currentTarget.name] = e.currentTarget.value;
    this.setState({ [group]: copyArr });
  };

  render() {
    const { education } = this.state;
    return (
      <div className="page resume-form">
        <form>
          <input
            type="text"
            name="firstname"
            value={this.state.firstname}
            onChange={this.textChange}
          />

          <input
            type="text"
            name="lastname"
            value={this.state.lastname}
            onChange={this.textChange}
          />

          <input
            type="text"
            name="email"
            value={this.state.email}
            onChange={this.textChange}
          />

          <div className="form-group">
            <h3>Образование</h3>
            <button onClick={this.addEdBlock}>+</button>

            {education.length > 0 &&
              education.map((ed, i) => {
                return (
                  <EdBlock
                    key={`ed_${i}`}
                    data={ed}
                    changeHandler={this.groupChange("education", i)}
                  />
                );
              })}
          </div>

          <textarea
            name="about"
            onChange={this.textChange}
            value={this.state.about}
            placeholder="text"
          />

          <input type="submit" value="Отправить" />
          <input type="button" value="Отмена" onClick={this.props.onCancel} />
        </form>
      </div>
    );
  }
}

export default ResumeForm;
