export const convertPatternToRegexp = (pattern: string): RegExp => {
  const str = pattern.replace(/\{[\s\S]+\}/gi, "[\\s\\S]+");
  return new RegExp(str);
};

export const isRouteMatchPattern = (pattern: string, path: string) => {
  const regExp = convertPatternToRegexp(pattern);
  const isMatch = regExp.test(path);
  return isMatch;
};

// export const getRouteParams = (pattern: string, path: string) => {
//   const isMatch = isRouteMatchPattern(pattern, path);
// };
