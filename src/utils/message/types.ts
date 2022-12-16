import { IncomingMessage, RequestListener, ServerResponse } from "http";
import { METHODS } from "./consts";

export type RequestHandler = RequestListener<
  typeof IncomingMessage,
  typeof ServerResponse
>;

export type Methods = keyof typeof METHODS;
