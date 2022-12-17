import { ServerResponse } from "http";
import { PatchedIncomingMessage } from "../message";
import { RequestValidator } from "./types";

export const validate = (validator: RequestValidator) => {
  return function (
    target: any,
    memberName: string,
    propertyDescriptor: PropertyDescriptor,
  ) {
    return {
      get() {
        const wrapperFn = async (
          req: PatchedIncomingMessage,
          res: ServerResponse,
          ...rest
        ) => {
          const error = validator(req.body);

          if (error) {
            res.writeHead(error.statusCode, {
              "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ error: error.message }));
            return;
          }

          propertyDescriptor.value.apply(this, [req, res, ...rest]);
        };

        Object.defineProperty(this, memberName, {
          value: wrapperFn,
          configurable: true,
          writable: true,
        });

        return wrapperFn;
      },
      set() {
        return null;
      },
    };
  };
};
