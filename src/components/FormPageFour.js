import React from 'react'
import { Control } from 'react-redux-form';
import { Button } from 'react-bootstrap';

const FormPageFour = ({ handleCipTag }) => (
  <div className="cip-form-field">
    <label>What would you like to do next?</label>
    <div className="radio">
      <label>
        <Control.radio model="ui.sameCipTag" value={true} />
          Add another user type on the same CIP tag
      </label>
    </div>
    <div className="radio">
      <label>
        <Control.radio model="ui.sameCipTag" value={false} />
          Add another CIP tag
      </label>
    </div>
    <Button className="nav-btns" bsStyle="primary" onClick={() => handleCipTag()}>
      Next
    </Button>
  </div>
);

export default FormPageFour;