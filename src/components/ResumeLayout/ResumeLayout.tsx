import React, { useState } from "react";

import Resume from "../../store/resume/types";
import ResumeForm from "../ResumeForm/ResumeForm";
import ResumeView from "../ResumeView/ResumeView";

interface ResumeProps {
  resume: Resume | null;
}

const ResumeLayout: React.FunctionComponent<ResumeProps> = ({ resume }) => {
  const [isEdit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!isEdit);

  if (resume) {
    if (isEdit) {
      return <ResumeForm resume={resume} onCancel={toggleEdit} />;
    }
    return <ResumeView resume={resume} onEdit={toggleEdit} />;
  }
  return null;
};

export default ResumeLayout;
