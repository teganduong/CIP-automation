import React, { Component } from 'react'
import AddBarredStatesModal from './AddBarredStatesModal';
import { Control, actions } from 'react-redux-form';
import { Button } from 'react-bootstrap';

class BarredStatesForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      alertVisible: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addBarredState = this.addBarredState.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  addBarredState() {
    const { dispatch, ui } = this.props;
    const selectedState = ui.selectedState || 'AK';
    dispatch(actions.push('cip.barredStates', selectedState));
    dispatch(actions.reset('ui.selectedState'));
    this.showAlert();
  }

  showAlert() {
    this.setState({ alertVisible: true });
    setTimeout(this.closeAlert, 2000);
  }

  closeAlert() {
    this.setState({ alertVisible: false });
  }

  render() {
    const { showModal, alertVisible } = this.state;
    const { ui } = this.props;
    return (
      <div className="cip-form-field">
        <div>
          <Control.checkbox model="ui.hasBarredStates" 
          /><strong> There are barred states</strong>
        </div>
        {ui.hasBarredStates && 
          <Button onClick={() => this.openModal()}>Add Barred States</Button>}
        <AddBarredStatesModal showModal={showModal} 
          closeModal={this.closeModal}
          addBarredState={this.addBarredState}
          closeAlert={this.closeAlert}
          alertVisible={alertVisible}
        />
      </div>
    );
  }
}

export default BarredStatesForm;