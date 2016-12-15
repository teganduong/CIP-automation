import React from 'react';
import { Control, Errors } from 'react-redux-form';
import { isRequired } from '../utils/validation-helpers';

const BaseDocsForm = () => (
  <div className="cip-form-field">
    <label>How many Base Documents are required?</label>
    <div>
      <Control.text model="account.minBaseDocs" type="number" 
        validators={{ isRequired }}
      /> 
      <Errors
        model="account.minBaseDocs"
        show="submitFailed"
        className="errors"
        messages={{
          isRequired: 'Number of base documents is required'
        }}
      />
    </div>
  </div>
);

export default BaseDocsForm;