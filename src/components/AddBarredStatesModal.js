import React from 'react'
import { Button, Modal } from 'react-bootstrap';
import { Control } from 'react-redux-form';
import us_states from '../data/us-states';
import AlertDisplay from './AlertDisplay';

const AddBarredStatesModal = (props) => {
  const { showModal, closeModal, addBarredState, 
    alertVisible, closeAlert } = props;
  const states = us_states.map(state => (
    <option value={state} key={state}>{state}</option>
  ));

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add Barred States</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {alertVisible && 
          <AlertDisplay msg="Barred state added!" closeAlert={closeAlert} />}
        <div>Select barred state to add:</div>
        <Control.select model="ui.selectedState">
          {states}
        </Control.select>
      </Modal.Body>
      <Modal.Footer>
        <Button className="add-btn" onClick={() => addBarredState()}>Add State
        </Button>
        <Button onClick={() => closeModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddBarredStatesModal;