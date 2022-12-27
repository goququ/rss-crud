import { PatchedIncomingMessage } from "../message";

export interface ValidationError {
  statusCode: number;
  message: string;
}

export type RequestValidator = (
  data: PatchedIncomingMessage,
) => undefined | ValidationError;
