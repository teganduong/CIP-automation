import React, { Component } from 'react'
import { Control, actions } from 'react-redux-form';
import { Button, Modal } from 'react-bootstrap';
import AlertDisplay from './AlertDisplay';

class MonthlyLimitForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      alertVisible: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.addMonthlyLimit = this.addMonthlyLimit.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  showAlert() {
    this.setState({ alertVisible: true });
    setTimeout(this.closeAlert, 2000);
  }

  closeAlert() {
    this.setState({ alertVisible: false });
  }

  addMonthlyLimit() {
    const { dispatch, ui } = this.props;
    const json = {};
    json[ui.currentMonthLmt.month] = ui.currentMonthLmt.limit;
    dispatch(actions.merge('account.monthlyLimit', json));
    dispatch(actions.reset('ui.currentMonthLmt'));
    this.showAlert();
  }

  render() {
    const { showModal, alertVisible } = this.state;
    const months = () => {
      const nums = [];
      for (let i = 1; i < 13; i++) {
        nums.push(i);
      }
      return nums.map(month => (
        <option value={month} key={month}>{month}</option>
      ));
    };
    return (
      <div className="cip-form-field">
        <Button onClick={() => this.openModal()}>Add Monthly Limits</Button>
        <Modal show={showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add Monthly Limits</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {alertVisible && 
              <AlertDisplay msg="Monthly limit added!" closeAlert={this.closeAlert} />}
            <div>Every 
              <Control.select model="ui.currentMonthLmt.month">
                {months()}
              </Control.select> month(s), user can send or receive 
              <Control.text model="ui.currentMonthLmt.limit" type="number" 
                className="form-input"
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="add-btn" onClick={() => this.addMonthlyLimit()}>
              Add Limit
            </Button>
            <Button onClick={() => this.closeModal()}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MonthlyLimitForm;