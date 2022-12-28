import { User } from "../../../store";
import { PatchedIncomingMessage, STATUS_CODES } from "../../message";
import { RequestValidator } from "../types";

const isNumber = (val: any) =>
  ![undefined, null, ""].includes(val) && !Number.isNaN(+val) && isFinite(+val);

export const validateIncomingUser: RequestValidator = (
  req?: PatchedIncomingMessage | undefined,
) => {
  const user = req?.body as Partial<User>;

  if (!user) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "user object not provided",
    };
  }

  if (!isNumber(user?.age)) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "'age' parameter not provided",
    };
  }
  if (!Array.isArray(user?.hobbies)) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "'hobbies' parameter not provided",
    };
  }
  if (!user.username) {
    return {
      statusCode: STATUS_CODES.BAD_REQUEST,
      message: "'username' parameter not provided",
    };
  }
};
