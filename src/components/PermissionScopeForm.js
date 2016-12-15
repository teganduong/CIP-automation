import React from 'react';
import { Control, Errors } from 'react-redux-form';
import { isRequired } from '../utils/validation-helpers';

const PermissionScopeForm = () => (
  <div className="cip-form-field">
    <label>What is the permission scope?</label>
    <div className="radio-div">
      <Control.radio model="account.permissionScope" value="SEND" 
        validators={{ isRequired }}
      /> SEND
    </div>
    <div className="radio-div">
      <Control.radio model="account.permissionScope" value="RECEIVE" 
        validators={{ isRequired }}
      /> RECEIVE
    </div>
    <Control.radio model="account.permissionScope" value="SEND-AND-RECEIVE" 
      validators={{ isRequired }}
    /> SEND-AND-RECEIVE
    <Errors
      model="account.permissionScope"
      show="submitFailed"
      className="errors"
      messages={{
        isRequired: 'Permission scope is required'
      }}
    />
  </div>
);

export default PermissionScopeForm;