import React from 'react'
import { Control, Errors } from 'react-redux-form';
import { _ } from 'underscore';
import { isRequired } from '../utils/validation-helpers';

const CipTagInfo = () => {
  
  return (
    <div>
      <div className="cip-form-field">
        <label>Node Limit</label>
        <div>
          <Control.text model="cip.nodeLimit" type="number" 
            validators={{ isRequired }}
          /> Nodes per User
          <Errors
            model="cip.nodeLimit"
            show="submitFailed"
            className="errors"
            messages={{
              isRequired: 'Node limit is required'
            }}
          />
        </div>
      </div>
      <div className="cip-form-field">
        <label>Daily Platform Limit</label>
        <div>
          <Control.text model="cip.gatewayDailyLimit" type="number" 
            validators={{ isRequired }}
          /> 
          <Errors
            model="cip.gatewayDailyLimit"
            show="submitFailed"
            className="errors"
            messages={{
              isRequired: 'Platform daily limit is required'
            }}
          />
        </div>
      </div>
      <div className="cip-form-field">
        <Control.checkbox model="cip.notificationsOn" />
        <strong> Send notifications</strong>
      </div>
    </div>
  );
};

export default CipTagInfo;