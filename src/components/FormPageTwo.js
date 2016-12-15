import React, { Component } from 'react'
import { Control, actions, Form } from 'react-redux-form';
import { Button } from 'react-bootstrap';
import TransLimitForm from './TransLimitForm';
import AddDocumentsModal from './AddDocumentsModal';
import PermissionScopeForm from './PermissionScopeForm';
import AlertDisplay from './AlertDisplay';
import CreditLimitForm from './CreditLimitForm';
import BaseDocsForm from './BaseDocsForm';
import MonthlyLimitForm from './MonthlyLimitForm';
import formatDocs from '../utils/formatDocs';
import { _ } from 'underscore';

class FormPageTwo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDocsModal: false,
      docsAlertVisible: false,
      acctAlertVisible: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleDocSubmit = this.handleDocSubmit.bind(this);
    this.addAccount = this.addAccount.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.closeDocsAlert = this.closeDocsAlert.bind(this);
    this.closeAcctAlert = this.closeAcctAlert.bind(this);
  }

  openModal() {
    this.setState({ showDocsModal: true });
  }

  closeModal() {
    this.setState({ showDocsModal: false });
  }

  handleDocSubmit() {
    const { dispatch, currentDoc } = this.props;
    const { type, name, alternative } = currentDoc;
    let docName;
    if (type === 'virtual') {
      const altDoc = alternative || 'GOVT_ID';
      docName = name || 'SSN';
      dispatch(actions.push('account.virtualDocs', docName));
      dispatch(actions.push('account.alternativeDocs', altDoc));
    } else if (type === 'physical') {
      docName = name || 'GOVT_ID';
      dispatch(actions.push('account.physicalDocs', docName));
    } else if (type === 'social') {
      docName = name || 'FACEBOOK';
      dispatch(actions.push('account.socialDocs', docName));
    }
    dispatch(actions.reset('currentDoc'));
    this.showDocsAlert();
  }

  showDocsAlert() {
    this.setState({ docsAlertVisible: true });
    setTimeout(this.closeDocsAlert, 2000);
  }

  showAcctAlert() {
    this.setState({ acctAlertVisible: true });
    setTimeout(this.closeAcctAlert, 2000);
  }

  closeDocsAlert() {
    this.setState({ docsAlertVisible: false });
  }

  closeAcctAlert() {
    this.setState({ acctAlertVisible: false });
  }

  addAccount() {
    const { dispatch, account, handleAcctSubmit, creditLimit } = this.props;
    dispatch(actions.push('cip.accounts', account));
    const json = {};
    json[account.transLimit] = formatDocs(account, creditLimit);
    handleAcctSubmit(json);
    dispatch(actions.setSubmitted('cip.accounts', true));
    dispatch(actions.reset('account'));
    dispatch(actions.reset('creditLimit'));
    this.showAcctAlert();
  }

  handleNext() {
    const { nextPage, cipActions, skipPageThree, ui } = this.props;
    cipActions.setDefaults();
    if (ui.sameCipTag) {
      skipPageThree();
    } else {
      nextPage();
    }
  }

  render() {
    const { previousPage, account, cip, dispatch, ui, currentDoc, forms } = this.props;
    const { $form } = forms.cip.accounts;
    const { docsAlertVisible, acctAlertVisible } = this.state;
    const tierIdInput = () => (
      <div className="cip-form-field">
        <label>Tier Number</label>
        <div><Control.text model="account.tierId" type="number" /></div>
      </div>
    );

    const NextBtn = (props) => (
      <button disabled={props.disabled} className="btn-primary btn"
        onClick={() => this.handleNext()}> Next
      </button>
    );
   
    return (
      <div>
        {acctAlertVisible && 
          <AlertDisplay msg="Account successfully added!" 
            closeAlert={this.closeAcctAlert} 
        />}
        {cip.tieredAccts === 'yes' && tierIdInput()}
        <Form model="account" onSubmit={() => this.addAccount()}>
          <TransLimitForm />
          <PermissionScopeForm />
          <CreditLimitForm />
          <MonthlyLimitForm dispatch={dispatch} ui={ui} />
          <BaseDocsForm />
          <div className="cip-form-field">
            <Button onClick={() => this.openModal()}>Add Documents
            </Button>
          </div>
          <AddDocumentsModal 
            showDocsModal={this.state.showDocsModal} 
            closeModal={this.closeModal} 
            account={account}
            handleDocSubmit={this.handleDocSubmit}
            docsAlertVisible={docsAlertVisible}
            closeAlert={this.closeDocsAlert}
            currentDoc={currentDoc}
          />
          <div className="cip-form-field">
            <Button className="add-btn" type="submit" block>
              Save and Add Account
            </Button>
          </div>
        </Form>
        <div className="nav-btns">
          <Button className="prev-btn" onClick={() => previousPage()}>Previous
          </Button>
          <Control model="cip.accounts" 
            component={NextBtn}
            controlProps={{
              disabled: !$form.submitted
            }}
            > 
          </Control>
        </div>
      </div>
    )
  }
}

export default FormPageTwo;