export const PARAM_REG_EXP = /\{([\w-]+)\}/g;

export const convertPatternToRegexp = (pattern: string): RegExp => {
  const str = pattern.replace(PARAM_REG_EXP, "([\\w-]+)");

  return new RegExp(`^${str}$`, "");
};

export const isRouteMatchPattern = (pattern: string, path: string) => {
  const regExp = convertPatternToRegexp(pattern);
  const isMatch = regExp.test(path);

  return isMatch;
};

export const getRouteParams = <R extends Record<string, string>>(
  pattern: string,
  path: string,
): R | null => {
  const isMatch = isRouteMatchPattern(pattern, path);

  if (!isMatch) {
    return null;
  }

  const regExp = convertPatternToRegexp(pattern);

  const matches = [...(path.match(regExp) || []).slice(1)];
  const patternMatches = (pattern.match(PARAM_REG_EXP) || []).map((m) =>
    m.replace(/\W/g, ""),
  );

  const result: Record<string, string> = {};

  for (let i = 0; i < patternMatches.length; i++) {
    const value = matches[i];
    const key = patternMatches[i];

    if (key in result) {
      throw new Error(`Duplicated key "${key}" in path "${path}"`);
    }

    result[key] = value;
  }

  return result as R;
};
