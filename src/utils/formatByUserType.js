import formatAccounts from './formatAccounts';
import formatAllowedNodes from './formatAllowedNodes';

export default function formatByUserType(cipTags) {
  const json = {};
  cipTags.forEach((cip, i) => {
    json[cip.userType] = formatAccounts(cip.accounts);
    if (i === cipTags.length - 1) {
      json["acceptable_flows"] = cip.nodes;
      if (cip.achOptions['microDeposit']) {
        json["skip_micro"] = false;
      } else {
        json["skip_micro"] = true;
      }
      json["send_micro"] = cip.achOptions['sendMicro'];
      json["allowed_nodes"] = formatAllowedNodes(cip);
      json["barred_states"] = cip.barredStates;
      json["max_nodes"] = cip.nodeLimit;
      json["force_kba"] = cip.forceKba;
      if (cip.forceKba) {
        json["kba_baseline"] = Number(cip.kbaBaseline);
      }
      json["notifications_on"] = cip.notificationsOn;
      json["gateway_daily_limit"] = Number(cip.gatewayDailyLimit);
    }
  });

  return json;
}