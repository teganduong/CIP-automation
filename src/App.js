import React, { Component } from 'react';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { actions } from 'react-redux-form';
import CipControlsDisplay from './components/CipControlsDisplay';
import WizardContainer from './containers/WizardContainer';
import { connect } from 'react-redux';
import { _ } from 'underscore';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      compact: false,
      cipControls: {}
    };

    this.submitPageOne = this.submitPageOne.bind(this);
    this.handleAcctSubmit = this.handleAcctSubmit.bind(this);
    this.submitPageThree = this.submitPageThree.bind(this);
  }

  submitPageOne() {
    const { cip, dispatch, page } = this.props;
    const { cipControls } = this.state;
    const json = {};
    json[cip.tagId] = cipControls[cip.tagId] || {};
    json[cip.tagId][cip.userType] = {};
    const newState = _.extend(cipControls, json);
    this.setState({ cipControls: newState });
    dispatch(actions.change('page', page+1));
  }

  handleAcctSubmit(account) {
    const { cip } = this.props;
    const { cipControls } = this.state;
    const userTypeObj = cipControls[cip.tagId][cip.userType];
    const json = {};
    json[cip.tagId] = cipControls[cip.tagId] || {};
    json[cip.tagId][cip.userType] = _.extend(userTypeObj, account);
    const newState = _.extend(cipControls, json);
    this.setState({ cipControls: newState });
  }

  submitPageThree(json) {
    const { cip } = this.props;
    const { cipControls } = this.state;
    const cipTag = {};
    cipTag[cip.tagId] = _.extend(cipControls[cip.tagId], json);
    const newState = _.extend(cipControls, cipTag);
    this.setState({ cipControls: newState });
  }

  toggleJsonFormat() {
    this.setState({ compact: !this.state.compact });
  }

  render() {
    const { compact, cipControls } = this.state;

    return (
      <div className="row">
        <div className="col-sm-5">
          <WizardContainer handleAcctSubmit={this.handleAcctSubmit} 
            submitPageOne={this.submitPageOne} 
            submitPageThree={this.submitPageThree}
          />
        </div>
        <div className="col-sm-6">
          <Button className="format-json-btn" onClick={() => this.toggleJsonFormat()}>
            Format/Compact JSON
          </Button>
          <CipControlsDisplay compact={compact} cipControls={cipControls} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ cip, page }) => ({ cip, page });
const mapDispatchToProps = (dispatch) => ({ 
  dispatch
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
