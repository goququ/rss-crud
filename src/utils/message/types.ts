import { IncomingMessage, RequestListener, ServerResponse } from "http";
import { METHODS } from "./consts";

export type PatchedIncomingMessage = InstanceType<typeof IncomingMessage> & {
  body: object;
};

export type RequestHandler = RequestListener<
  typeof IncomingMessage & {
    body?: any;
  },
  typeof ServerResponse
>;

export type Middleware = (
  req: PatchedIncomingMessage,
  res: InstanceType<typeof ServerResponse> & {
    req: InstanceType<typeof IncomingMessage>;
  },
  next: (...args: any) => void,
) => void;

export type Methods = keyof typeof METHODS;
