export const isNil = (val: any): val is null | undefined =>
  [null, undefined].includes(val);

export const isNumber = (val: any): val is number =>
  isFinite(+val) && !Number.isNaN(+val);
