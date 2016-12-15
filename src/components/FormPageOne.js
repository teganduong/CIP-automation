// FormPageOne.js contains basic CIP tag info
import React from 'react'
import { Button } from 'react-bootstrap';
import { Form } from 'react-redux-form';
import UserTypeForm from './UserTypeForm';
import TieredAcctsForm from './TieredAcctsForm';
import CipTagForm from './CipTagForm';

const FormPageOne = (props) => {
  const { ui, cipActions, submitPageOne } = props;

  return (
    <Form model="cip" onSubmit={() => submitPageOne()}>
      {!ui.sameCipTag && <CipTagForm />}
      <UserTypeForm cipActions={cipActions} />
      <TieredAcctsForm />
      <Button className="nav-btns" type="submit" bsStyle="primary"> Next
      </Button>
    </Form>
  );
};

export default FormPageOne;