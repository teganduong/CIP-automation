import React, { Component } from 'react'
import { actions, Errors, Form } from 'react-redux-form';
import { Button } from 'react-bootstrap';
import { _ } from 'underscore';
import CipTagInfo from './CipTagInfo';
import BarredStatesForm from './BarredStatesForm';
import KbaForm from './KbaForm';
import AddNodesModal from './AddNodesModal';
import formatAllowedNodes from '../utils/formatAllowedNodes';
import { hasNodes } from '../utils/validation-helpers';

class FormPageThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNodeModal: false,
      nodeAlertVisible: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleToNodes = this.handleToNodes.bind(this);
    this.handleNodeSubmit = this.handleNodeSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.handlePageSubmit = this.handlePageSubmit.bind(this);
  }

  openModal() {
    this.setState({ showNodeModal: true });
  }

  closeModal() {
    this.setState({ showNodeModal: false });
  }

  handleToNodes() {
    const { dispatch } = this.props;
    const nodes = document.toNodesForm.elements;
    const toNodes = [];
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].checked) {
        toNodes.push(nodes[i].value);
      }
    }
    dispatch(actions.change('node.toNodes', toNodes));
  }

  showNodeAlert() {
    this.setState({ nodeAlertVisible: true });
    setTimeout(this.closeAlert, 2000);
  }

  closeAlert() {
    this.setState({ nodeAlertVisible: false });
  }

  resetNodes() {
    const { dispatch } = this.props;
    const nodes = document.toNodesForm.elements;
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].checked = false;
    }
    dispatch(actions.reset('node'));
  }

  handleNodeSubmit() {
    const { dispatch, cip, node } = this.props;
    const json = {};
    json[node.fromNode] = node.toNodes;
    dispatch(actions.merge('cip.nodes', json));
    if (node.fromNode !== 'ACH-US') {
      dispatch(actions.push('cip.allowedNodes', node.fromNode));
    } else {
      const achOptions = formatAllowedNodes(node);
      const nodes = cip.allowedNodes.concat(achOptions);
      dispatch(actions.load('cip.allowedNodes', nodes));
    }
    this.resetNodes();
    this.showNodeAlert();
  }

  handlePageSubmit() {
    const { cip, nextPage, submitPageThree } = this.props;
    const json = {};
    json['acceptable_flows'] = cip.nodes;
    json['allowed_nodes'] = cip.allowedNodes;
    json['send_micro'] = cip.sendMicro;
    json['skip_micro'] = cip.skipMicro;
    json['max_nodes'] = Number(cip.nodeLimit);
    json['notifications_on'] = cip.notificationsOn;
    json['force_kba'] = cip.forceKba;
    json['barred_states'] = cip.barredStates;
    json['gateway_daily_limit'] = Number(cip.gatewayDailyLimit);
    submitPageThree(json);
    nextPage();
  }

  render() {
    const { cip, cipActions, ui, dispatch, previousPage, node } = this.props;
    const { showNodeModal, nodeAlertVisible } = this.state;
    return (
      <Form model="cip" onSubmit={() => this.handlePageSubmit()}
        validators={{
          nodes: { hasNodes }
        }}
        validateOn="submit"
      >
        <CipTagInfo />
        <div className="cip-form-field">
          <Button onClick={() => this.openModal()}>Add Node Types</Button>
          <Errors model="cip.nodes" className="errors"
            messages={{
              hasNodes: 'Please add node types'
            }}
          />
        </div>
        <AddNodesModal cip={cip} node={node}
          showNodeModal={showNodeModal} 
          closeModal={this.closeModal}
          handleToNodes={this.handleToNodes}
          handleNodeSubmit={this.handleNodeSubmit}
          nodeAlertVisible={nodeAlertVisible}
          closeAlert={this.closeAlert}
          dispatch={dispatch}
        />
        <KbaForm cip={cip} />
        <BarredStatesForm ui={ui} dispatch={dispatch} cipActions={cipActions} />
        <div className="nav-btns">
          <Button className="prev-btn" onClick={() => previousPage()}> Previous
          </Button>
          <Button bsStyle="primary" type="submit"> Next
          </Button>
        </div>
      </Form>
    );
  }
}

export default FormPageThree;