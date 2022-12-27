import { User } from "../../../store";
import { isNil } from "../../common";
import { PatchedIncomingMessage, STATUS_CODES } from "../../message";
import { RequestValidator } from "../types";

const isNumber = (val: any) =>
  ![undefined, null, ""].includes(val) && !Number.isNaN(+val) && isFinite(+val);

export const validateUserToUpdate: RequestValidator = (
  req?: PatchedIncomingMessage | undefined,
) => {
  const { age, hobbies, username } = (req?.body as Partial<User>) || {};

  if (!req?.body) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "user object not provided",
    };
  }

  if (!isNil(age) && !isNumber(age)) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "'age' parameter not valid",
    };
  }
  if (
    !isNil(hobbies) &&
    (!Array.isArray(hobbies) || !hobbies.every((i) => typeof i === "string"))
  ) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "'hobbies' parameter not valid",
    };
  }
  if (!isNil(username) && (!username || typeof username !== "string")) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "'username' parameter not valid",
    };
  }
};
