import { convertPatternToRegexp } from "./routeMatcher";

describe("Route matcher utils", () => {
  test('"convertPatternToRegexp" util works properly', () => {
    const PATTERN = "api/user/{userId}";
    const regExp = convertPatternToRegexp(PATTERN);

    expect(regExp.test("api/user/12")).toBe(true);
  });
});
