
export default function formatMinDocs(cip) {
  const permission = cip.permissionScope;
  const minDocs = {};
  if (permission === 'SEND-AND-RECEIVE') {
    return {
      "SEND": cip.minBaseDocs,
      "RECEIVE": cip.minBaseDocs
    };
  } else {
    minDocs[permission] = cip.minBaseDocs;
    return minDocs;
  }
}