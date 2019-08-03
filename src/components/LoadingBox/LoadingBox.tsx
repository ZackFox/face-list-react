import React from 'react';

import './LoadingBox.css';

interface LoadingBoxProps {}

const LoadingBox: React.FunctionComponent<LoadingBoxProps> = props => {
  return (
    <div className="loading-box">
      <span>загрузка</span>
    </div>
  );
};

export default LoadingBox;
