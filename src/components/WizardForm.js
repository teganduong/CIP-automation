import React, { Component, PropTypes } from 'react'
import { actions } from 'react-redux-form';
import { _ } from 'underscore';
import FormPageOne from './FormPageOne';
import FormPageTwo from './FormPageTwo';
import FormPageThree from './FormPageThree';
import FormPageFour from './FormPageFour';

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.handleCipTag = this.handleCipTag.bind(this);
    this.skipPageThree = this.skipPageThree.bind(this);
  }

  nextPage() {
    const { dispatch, page } = this.props;
    dispatch(actions.change('page', page+1));
  }

  previousPage() {
    const { dispatch, page } = this.props;
    dispatch(actions.change('page', page-1));
  }

  addUserType() {
    const { dispatch } = this.props;
    dispatch(actions.reset('cip.userType'));
    dispatch(actions.change('page', 1));
  }

  addCipTag() {
    const { dispatch } = this.props;
    dispatch(actions.reset('cip'));
    dispatch(actions.reset('account'));
    dispatch(actions.reset('node'));
    dispatch(actions.change('page', 1));
  }

  handleCipTag() {
    const { sameCipTag } = this.props.ui;
    if (sameCipTag) {
      this.addUserType();
    } else {
      this.addCipTag();
    }
  }

  skipPageThree() {
    const { dispatch } = this.props;
    dispatch(actions.change('page', 4));
  }

  render() {
    const { cip, ui, dispatch, account, cipActions, page, handleAcctSubmit, creditLimit,
      node, currentDoc, submitPageOne, submitPageThree, forms } = this.props;
    return (
      <div className="wizard-form">
        {page === 1 && 
          <FormPageOne nextPage={this.nextPage} submitPageOne={submitPageOne}
            cip={cip} ui={ui} dispatch={dispatch} cipActions={cipActions}
          />}
        {page === 2 && 
          <FormPageTwo previousPage={this.previousPage} nextPage={this.nextPage}
            skipPageThree={this.skipPageThree} handleAcctSubmit={handleAcctSubmit}
            account={account} cip={cip} ui={ui} cipActions={cipActions}
            dispatch={dispatch} currentDoc={currentDoc}
            creditLimit={creditLimit} forms={forms}
          />}
        {page === 3 && 
          <FormPageThree previousPage={this.previousPage} node={node}
            nextPage={this.nextPage} cip={cip} ui={ui}
            dispatch={dispatch} cipActions={cipActions}
            submitPageThree={submitPageThree}
          />}
        {page === 4 && 
          <FormPageFour previousPage={this.previousPage} 
            handleCipTag={this.handleCipTag} 
          />}
      </div>
    )
  }
}

WizardForm.propTypes = {
  cip: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  account: PropTypes.object.isRequired,
  cipActions: PropTypes.object.isRequired,
  node: PropTypes.object.isRequired
}

export default WizardForm;