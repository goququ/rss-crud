export const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  OPTIONS: "OPTIONS",
  PATCH: "PATCH",
} as const;

export const STATUS_CODES = {
  OK: 200,
  BAD_REQUEST: 400,
  INTERNAL_ERROR: 500,
};
