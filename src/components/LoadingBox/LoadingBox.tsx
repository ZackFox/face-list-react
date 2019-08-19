import React from "react";

import "./LoadingBox.css";

interface LoadingBoxProps {}

const LoadingBox: React.FunctionComponent<LoadingBoxProps> = props => {
  return (
    <div className="loading-box">
      <div className="preloader-wrapper">
        <svg width="40" height="40" viewBox="0 0 40 40">
          <polygon className="preloader" points="0 0 0 40 40 40 40 0" />
        </svg>
        <p>...загрузка...</p>
      </div>
    </div>
  );
};

export default LoadingBox;
