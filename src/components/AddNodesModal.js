import React from 'react'
import { Control, actions, Field } from 'react-redux-form';
import { Button, Modal } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay';

const nodeTypes = [
  'SYNAPSE-US', 'ACH-US', 'TRIUMPH-SUBACCOUNT-US', 'WIRE-US', 'WIRE-INT', 
  'RESERVE-US', 'IOU', 'SYNAPSE-NP', 'EFT-NP'
];

const AddNodesModal = (props) => {
  const { showNodeModal, closeModal, handleNodeSubmit, 
    node, nodeAlertVisible, closeAlert, dispatch } = props;

  const listNodeTypes = () => {
    const nodeTypeOptions = nodeTypes.map((nType, i) => (
      <option value={nType} key={i}>{nType}</option>
    ));
    return (
      <select>{nodeTypeOptions}</select>
    );
  };
  const toNodeTypes = () => {
    const types = nodeTypes.map((type, i) => (
      <div key={i}>
      <input type="checkbox" name={type} value={type} 
        onChange={(evt) => dispatch(actions.xor('node.toNodes', evt.target.value))}
        /> {type}
      </div>
    ));

    return (
      <form name="toNodesForm">
        {types}
      </form>
    );
  };

  const achOptions = () => (
    <div>
      <div>
        <label className="checkbox-inline">
          <Control.checkbox model="node.achOptions.achManual" />
            Account/Routing
        </label>
        <label className="checkbox-inline">
          <Control.checkbox model="node.achOptions.achLogin" />
            Online Logins
        </label>
      </div>
      <div>
        <label className="checkbox-inline">
          <Control.checkbox model="cip.skipMicro" />
            Skip micro-deposit verification
        </label>
        <label className="checkbox-inline">
          <Control.checkbox model="cip.sendMicro" />
            Send micro-deposit
        </label>
      </div>
    </div>
  );

  return (
    <Modal show={showNodeModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Node Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {nodeAlertVisible && 
          <AlertDisplay msg="Node successfully added!" closeAlert={closeAlert} />}
        <div>What type of node is this (from node)?</div>
        <Field model="node.fromNode">
          {listNodeTypes()}
        </Field>
        {node.fromNode === 'ACH-US' && achOptions()}
        <div className="node-field">can send to these node types:</div>
        {toNodeTypes()}
      </Modal.Body>
      <Modal.Footer>
        <Button className="add-btn" onClick={() => handleNodeSubmit()}>Add Node
        </Button>
        <Button onClick={() => closeModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNodesModal;