export interface ValidationError {
  statusCode: number;
  message: string;
}

export type RequestValidator = (data: any) => undefined | ValidationError;
