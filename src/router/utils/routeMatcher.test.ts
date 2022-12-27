import {
  convertPatternToRegexp,
  isRouteMatchPattern,
  getRouteParams,
  PARAM_REG_EXP,
} from "./matchRoutes";

describe("Route matcher utils", () => {
  const PATTERN1 = "api/user/{userId}";
  const PATTERN2 = "api/user/{userId}/{userName}";

  test("PARAM_REG_EXP should match all path params like '{param}'", () => {
    expect(PATTERN1.match(PARAM_REG_EXP)).toStrictEqual(["{userId}"]);
    expect(PATTERN2.match(PARAM_REG_EXP)).toStrictEqual([
      "{userId}",
      "{userName}",
    ]);
  });

  test('"convertPatternToRegexp" build proper RegExp for concrete path pattern', () => {
    const regExp = convertPatternToRegexp(PATTERN1);

    expect(regExp.test("api/user/12")).toBe(true);
    expect(regExp.test("api/user/12-ds")).toBe(true);
    expect(regExp.test("api/user/abc")).toBe(true);
    expect(regExp.test("api/another/path/12")).toBe(false);

    const regExp2 = convertPatternToRegexp(PATTERN2);

    expect(regExp2.test("api/user/12")).toBe(false);
    expect(regExp2.test("api/user/abc")).toBe(false);
    expect(regExp2.test("api/user/path/12")).toBe(true);
    expect(regExp2.test("api/another/path/12")).toBe(false);

    const regExp3 = convertPatternToRegexp("api/user");

    expect(regExp3.test("api/user/12")).toBe(false);
    expect(regExp3.test("api/user")).toBe(true);
  });

  test('"isRouteMatchPattern" util works properly', () => {
    expect(isRouteMatchPattern(PATTERN1, "api/user/12")).toBe(true);
    expect(isRouteMatchPattern(PATTERN1, "api/another/path/12")).toBe(false);
  });

  test('"getRouteParams" util works properly', () => {
    expect(getRouteParams(PATTERN2, "api/user/v1/v2")).toStrictEqual({
      userId: "v1",
      userName: "v2",
    });
    expect(getRouteParams(PATTERN2, "api/user/v1")).toBe(null);
  });
});
