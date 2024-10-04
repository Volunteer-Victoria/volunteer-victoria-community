import { ResponseError } from "../api";

export const NO_CODE_GIVEN = "NONE";
export const EMAIL_UNVERIFIED = "EMAIL_UNVERIFIED";

export const getErrorCode = async (error: ResponseError): Promise<string> => {
  return (await error.response.json()).code || NO_CODE_GIVEN;
};

export const isEmailUnverifiedError = async (
  error: ResponseError
): Promise<boolean> => {
  return (await getErrorCode(error)) === EMAIL_UNVERIFIED;
};

export const EMAIL_UNVERIFIED_MESSAGE =
  "Please verify your email address, log out, and log back in. Sorry.";
