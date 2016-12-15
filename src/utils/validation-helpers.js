
export const isRequired = (val) => {
  if (typeof val === 'number') {
    return val > 0;
  }
  return val && val.length;
};

export const hasNodes = (nodes) => (
  Object.keys(nodes).length > 0
);

export const isNumber = (val) => !isNaN(Number(val));

export const hasAccts = (accounts) => accounts.length > 0;