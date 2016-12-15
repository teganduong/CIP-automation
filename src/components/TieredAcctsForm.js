import React from 'react';
import { Control } from 'react-redux-form';

const TieredAcctsForm = () => {
  return (
    <div className="cip-form-field">
      <label>Does this entity have tiered accounts?</label>
      <div className="radio-div">
        <Control.radio model="cip.tieredAccts" name="tieredAccts" value="no" /> No
      </div>
      <Control.radio model="cip.tieredAccts" name="tieredAccts" value="yes" /> Yes
    </div>
  );
};

export default TieredAcctsForm;