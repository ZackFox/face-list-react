import React, { Component } from "react";
import { connect } from "react-redux";

import { AppState } from "../store";
import ResumeForm from "../components/ResumeForm/ResumeForm";

class CreateResume extends Component {
  render() {
    return <ResumeForm />;
  }
}

export default CreateResume;
