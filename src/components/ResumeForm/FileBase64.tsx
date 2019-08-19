import React, { useState } from "react";
import Dropzone from "react-dropzone";

interface FileBase64Props {
  onDone: (file: any) => void;
}

const FileBase64: React.FunctionComponent<FileBase64Props> = props => {
  const handleChange = (dataSet: any) => {
    let files = [];
    for (let i = 0; i < dataSet.length; i++) {
      if (dataSet[i].type === "image/jpeg") {
        files.push(dataSet[i]);
      }
    }

    if (files.length) {
      const file = files[0];
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        props.onDone(reader.result);
      };
    }
  };

  return (
    <Dropzone onDrop={handleChange}>
      {({ getRootProps, getInputProps }) => {
        return (
          <div
            className="dropable"
            style={{ width: "100px", height: "100px" }}
            {...getRootProps()}
          >
            <input type="file" onChange={handleChange} {...getInputProps()} />
          </div>
        );
      }}
    </Dropzone>
  );
};

export default FileBase64;
