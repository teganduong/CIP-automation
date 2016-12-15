import React from 'react';
import { Control, Errors } from 'react-redux-form';
import { isRequired } from '../utils/validation-helpers';

const UserTypeForm = ({ cipActions }) => (
  <div className="cip-form-field">
    <label>Is this for individuals or businesses?</label>
    <div className="radio-div">
      <Control.radio model="cip.userType" value="PERSONAL" 
        validators={{ isRequired }}
      /> Individuals
    </div>
    <Control.radio model="cip.userType" value="BUSINESS" 
      validators={{ isRequired }}
    /> Businesses
    <Errors
      model="cip.userType"
      show="submitFailed"
      className="errors"
      messages={{
        isRequired: 'User type is required'
      }}
    />
  </div>
);

export default UserTypeForm;