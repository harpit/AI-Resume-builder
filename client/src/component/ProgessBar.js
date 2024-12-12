import React from 'react';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-bar">
      <div className="progress" style={{ width: `${progress}%` }} />
    </div>
  );
};

export default ProgressBar;
