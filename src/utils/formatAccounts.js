import formatDocs from './formatDocs';

export default function formatAccounts(accounts) {
  const json = {};
  accounts.forEach(acct => {
    json[acct.transLimit] = formatDocs(acct);
  });
  return json;
}