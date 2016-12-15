import React from 'react'
import { Control, Errors } from 'react-redux-form';
import { isRequired } from '../utils/validation-helpers';

const TransLimitForm = () => (
  <div className="cip-form-field">
    <label>Transaction Limit</label>
    <div>
      <Control.text model="account.transLimit" type="number" 
        validators={{ isRequired }}
      /> per day
      <Errors
        model="account.transLimit"
        show="submitFailed"
        className="errors"
        messages={{
          isRequired: 'Transaction limit is required'
        }}
      />
    </div>
  </div>
);

export default TransLimitForm;