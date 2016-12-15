import formatMinDocs from './formatMinDocs';
import formatCreditLimit from './formatCreditLimit';

const makeDocsCombo = (account) => {
  const { virtualDocs, physicalDocs, socialDocs, alternativeDocs } = account;
  if (!virtualDocs.length && !physicalDocs.length && !socialDocs.length) {
    return [];
  }
  const jsonDocs = {
    "virtual_docs": virtualDocs,
    "physical_docs": physicalDocs,
    "social_docs": socialDocs
  };
  const allDocs = [jsonDocs];


  virtualDocs.forEach((doc, i) => {
    const docCombo = {
      "virtual_docs": virtualDocs.slice(),
      "physical_docs": physicalDocs.slice(),
      "social_docs": socialDocs.slice()
    };
    docCombo["physical_docs"].push(alternativeDocs[i]);
    docCombo["virtual_docs"].splice(i, 1);
    allDocs.push(docCombo);
  });

  return allDocs;
};

export default function formatDocs(account, creditLimit) {
  const permission = account.permissionScope;
  const sendReceiveDocs = {};

  if (permission === 'SEND-AND-RECEIVE') {
    sendReceiveDocs.SEND = makeDocsCombo(account);
    sendReceiveDocs.RECEIVE = makeDocsCombo(account);
  } else {
    sendReceiveDocs[permission] = makeDocsCombo(account);
  } 

  sendReceiveDocs["context"] = "DAILY";
  sendReceiveDocs["credit_limit"] = formatCreditLimit(creditLimit);
  sendReceiveDocs["min_docs"] = formatMinDocs(account);
  sendReceiveDocs["monthly_limit"] = account.monthlyLimit;

  return sendReceiveDocs;
}