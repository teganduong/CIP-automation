import React from 'react'
import { Control, Field } from 'react-redux-form';
import { Button, Modal } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay';
import { virtualDocs, physicalDocs, socialDocs } from '../data/document-types';

const AddDocumentsModal = (props) => {
  const { showDocsModal, closeModal, 
    handleDocSubmit, docsAlertVisible, closeAlert, currentDoc } = props;

  const listDocTypes = (docTypes) => {
    const options = docTypes.map((doc, i) => (
      <option value={doc} key={i}>{doc}</option>
    ));

    return (
      <select>{options}</select>
    );
  };
  const alternativeOptions = () => (
    <div className="doc-form-field">
      If Virtual Document fails, what Physical Document should be used instead?
      <div>
        <Field model="currentDoc.alternative">
          {listDocTypes(physicalDocs)}
        </Field>
      </div>
    </div>
  );
  return (
    <Modal show={showDocsModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {docsAlertVisible && <AlertDisplay msg="Document successfully added!" 
                              closeAlert={closeAlert}
        />}
        <div>What type of document is this?</div>
        <label className="radio-inline">
          <Control.radio model="currentDoc.type" value="virtual" /> Virtual
        </label>
        <label className="radio-inline">
          <Control.radio model="currentDoc.type" value="physical" /> Physical
        </label>
        <label className="radio-inline">
          <Control.radio model="currentDoc.type" value="social" /> Social
        </label>
        <div className="select-options">
          <Field model="currentDoc.name">
            {currentDoc.type === 'virtual' && listDocTypes(virtualDocs)}
            {currentDoc.type === 'physical' && listDocTypes(physicalDocs)}  
            {currentDoc.type === 'social' && listDocTypes(socialDocs)}
          </Field>
        </div>
        {currentDoc.type === 'virtual' && alternativeOptions()}
      </Modal.Body>
      <Modal.Footer>
        <Button className="add-btn" onClick={() => handleDocSubmit()}>Add Document
        </Button>
        <Button onClick={() => closeModal()}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDocumentsModal;