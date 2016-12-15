import { actions } from 'react-redux-form';

export const setCipTag = () => (dispatch, getState) => {
  const { cip } = getState();
  const json = {};
  json[cip.tagId] = {};
  if (cip.userType) {
    json[cip.tagId][cip.userType] = {};
  }
  dispatch(actions.merge('controls', json));
};

export const setNodeLimit = (nodeLimit) => (dispatch, getState) => {
  dispatch(actions.change('cip.nodeLimit', nodeLimit));
  const { cip } = getState();
  const json = {};
  json["max_nodes"] = Number(nodeLimit);
  dispatch(actions.merge(`controls.${cip.tagId}`, json));
};

export const setPlatformLimit = (platformLimit) => (dispatch, getState) => {
  dispatch(actions.change('ui.gatewayDailyLimit', platformLimit));
  const { cip } = getState();
  const json = {};
  json["gateway_daily_limit"] = Number(platformLimit);
  dispatch(actions.merge(`controls.${cip.tagId}`, json));
};

export const setAllowedNodes = () => (dispatch, getState) => {
  const { cip } = getState();
  // const json = {};
  // json['allowed_nodes'] = cip.allowedNodes;
  // dispatch(actions.merge(`controls.${cip.tagId}`, json));
  dispatch(actions.load(`controls.${cip.tagId}['allowed_nodes']`, cip.allowedNodes));
};

export const setNodeFlows = () => (dispatch, getState) => {
  const { cip } = getState();
  const json = {};
  json['acceptable_flows'] = cip.nodes;
  json['allowed_nodes'] = cip.allowedNodes;
  dispatch(actions.load(`controls.${cip.tagId}`, json));
  // dispatch(actions.load(`controls.${cip.tagId}['allowed_nodes']`, cip.allowedNodes));
  // dispatch(actions.reset('node'));
};

export const setUserType = (model, value) => (dispatch, getState) => {
  dispatch(actions.change(model, value));
  const { cip } = getState();
  const json = {};
  json[value] = {};
  dispatch(actions.change(`controls.${cip.tagId}`, json));
};

export const setForceKba = (forceKba) => (dispatch, getState) => {
  const { cip } = getState();
  const json = {};
  json['force_kba'] = forceKba;
  if (forceKba) {
    json['kba_baseline'] = cip.kbaBaseline;
  } else {
    dispatch(actions.omit(`controls.${cip.tagId}`, 'kba_baseline'));
  }
  dispatch(actions.merge(`controls.${cip.tagId}`, json));
};

export const setKbaBaseline = (baseline) => (dispatch, getState) => {
  const { cip } = getState();
  const json = {};
  json['kba_baseline'] = Number(baseline);
  dispatch(actions.merge(`controls.${cip.tagId}`, json));
};

export const setBarredStates = () => (dispatch, getState) => {
  const { cip, ui } = getState();
  const json = {};
  if (ui.hasBarredStates) {
    json['barred_states'] = cip.barredStates;
  } else {
    json['barred_states'] = [];
  }
  dispatch(actions.merge(`controls.${cip.tagId}`, json));
};

export const setDefaults = () => (dispatch, getState) => {
  const { cip, ui } = getState();
  const json = {};
  json['max_nodes'] = Number(cip.nodeLimit);
  json['acceptable_flows'] = cip.nodes;
  json['allowed_nodes'] = cip.allowedNodes;
  json['notifications_on'] = cip.notificationsOn;
  json['force_kba'] = cip.forceKba;
  json['barred_states'] = cip.barredStates;
  json['gateway_daily_limit'] = Number(ui.gatewayDailyLimit);
  dispatch(actions.merge(`controls.${cip.tagId}`, json));
};

