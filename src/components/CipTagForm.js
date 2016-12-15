import React from 'react'
import { Control, Errors } from 'react-redux-form';
import { isRequired } from '../utils/validation-helpers';

const CipTagForm = () => (
  <div className="cip-form-field">
    <label>CIP tag number</label>
    <div>
      <Control.text model="cip.tagId" type="number" 
        validators={{ isRequired }}
      />
    </div>
    <Errors
      model="cip.tagId"
      show="submitFailed"
      className="errors"
      messages={{
        isRequired: 'CIP tag number is required'
      }}
    />
  </div>
);

export default CipTagForm;