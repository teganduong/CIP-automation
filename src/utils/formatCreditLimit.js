
export default function formatCreditLimit(creditLimit) {
  const { amt, context } = creditLimit;
  if (!amt) {
    return {};
  }
  const json = {};
  json[context] = amt;
  return json;
}