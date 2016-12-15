import { actions } from 'react-redux-form';
import formatDocs from '../utils/formatDocs';

export const setTransLimit = (model, value) => (dispatch, getState) => {
  dispatch(actions.change(model, value));
  const { cip } = getState();
  const json = {};
  // json[account.transLimit] = {};
  dispatch(actions.change(`controls.${cip.tagId}.${cip.userType}.${value}`, json));
};

export const setPermissionScope = (model, value) => (dispatch, getState) => {
  dispatch(actions.change(model, value));
  const { cip, account } = getState();
  const json = {};
  if (value === 'SEND-AND-RECEIVE') {
    json['SEND'] = [];
    json['RECEIVE'] = [];
  } else {
    json[value] = [];
  }
  dispatch(actions.load(`controls.${cip.tagId}.${cip.userType}.${account.transLimit}`, json));
};

export const addAccount = () => (dispatch, getState) => {
  const { cip, account } = getState();
  const json = {};
  json[account.transLimit] = formatDocs(account);
  dispatch(actions.merge(`controls.${cip.tagId}.${cip.userType}`, json));
  // dispatch(actions.reset('account'));
};