import React from 'react';
import { Control } from 'react-redux-form';

const CreditLimitForm = () => (
  <div className="cip-form-field">
    <label>What is the credit limit?</label>
    <div>
      <Control.text model="creditLimit.amt" type="number" />  
      <Control.select model="creditLimit.context">
        <option value="daily"> Daily</option>
        <option value="monthly"> Monthly</option>
      </Control.select>
    </div>  
  </div>
);

export default CreditLimitForm;