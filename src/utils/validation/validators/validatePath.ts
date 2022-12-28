import { isRouteMatchPattern } from "../../../router/utils";
import { PatchedIncomingMessage, STATUS_CODES } from "../../message";
import { RequestValidator } from "../types";

export const validatePath =
  (pathPattern: string): RequestValidator =>
  (req?: PatchedIncomingMessage | undefined) => {
    const path = req?.url || "";

    if (!isRouteMatchPattern(pathPattern, path)) {
      return {
        statusCode: STATUS_CODES.BAD_REQUEST,
        message: "Invalid path",
      };
    }

    return undefined;
  };
