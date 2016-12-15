export const initialCipState = {
  tagId: '',
  userType: '',
  tieredAccts: '',
  nodes: {},
  allowedNodes: [],
  nodeLimit: 3,
  accounts: [],
  notificationsOn: true,
  barredStates: [],
  forceKba: false,
  kbaBaseline: 80,
  sendMicro: true,
  skipMicro: false,
  gatewayDailyLimit: ''
};

export const initialNodeState = {
  fromNode: 'SYNAPSE-US',
  toNodes: [],
  achOptions: {
    'achManual': true,  // account/routing
    'achLogin': true
  }
};

export const initialDocState = {
  type: '',
  name: '',
  alternative: ''
};

export const initialCreditLimit = {
  amt: '',
  context: 'daily'
};

export const initialAcctState = {
  tierId: '',
  transLimit: '',
  permissionScope: '',
  monthlyLimit: {},
  minBaseDocs: 1,
  virtualDocs: [],
  physicalDocs: [],
  socialDocs: [],
  alternativeDocs: []
};

export const initialUiState = {
  selectedState: '',     // currently selected barred state
  hasBarredStates: false,
  currentMonthLmt: {
    month: '1',
    limit: ''
  },
  sameCipTag: false
};
