
export default function formatAllowedNodes(cip) {
  const allowedNodes = [];
  for (let node in cip.achOptions) {
    if (node === 'achManual' && cip.achOptions[node]) {
      allowedNodes.push('ACH-US-MANUAL');
    }
    if (node === 'achLogin' && cip.achOptions[node]) {
      allowedNodes.push('ACH-US-LOGIN');
    }
  }

  return allowedNodes;
}