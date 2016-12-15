import React, { PropTypes } from 'react';

const CipControlsDisplay = ({ compact, cipControls }) => {
  const controlsDisplay = JSON.stringify(cipControls, null, 2);
  const formatJson = () => {
    if (compact) {
      return controlsDisplay;
    } else {
      return (<pre>{controlsDisplay}</pre>);
    }
  };

  return (
    <div className="cip-controls-display">
      {formatJson()}
    </div>
  );
};

CipControlsDisplay.propTypes = {
  cipControls: PropTypes.object.isRequired,
  compact: PropTypes.bool.isRequired
};

export default CipControlsDisplay;