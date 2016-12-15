import React from 'react'
import { Control } from 'react-redux-form';

const KbaForm = ({ cip }) => (
  <div className="cip-form-field">
    <Control.checkbox model="cip.forceKba" />
    <strong> Force KBA</strong>
    {cip.forceKba && 
      <div>
        KBA Baseline: 
        <Control.text model="cip.kbaBaseline" type="number" />
      </div>}
  </div>
);

export default KbaForm;