import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { combineForms } from 'react-redux-form';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { 
  initialCipState, initialAcctState, initialUiState, 
  initialNodeState, initialDocState, initialCreditLimit
} from './reducers/index';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const rootReducer = combineForms({
  cip: initialCipState,
  account: initialAcctState,
  creditLimit: initialCreditLimit,
  ui: initialUiState,
  node: initialNodeState,
  currentDoc: initialDocState,
  page: 1
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(thunk)
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
