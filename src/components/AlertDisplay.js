import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertDisplay = ({ msg, closeAlert }) => (
  <Alert bsStyle="success" onDismiss={closeAlert}>
    {msg}
  </Alert>
);

export default AlertDisplay;