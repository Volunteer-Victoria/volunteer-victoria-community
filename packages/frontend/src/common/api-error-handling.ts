import { useSnackbar } from "notistack";
import { ResponseError } from "../api";

const NO_CODE_GIVEN = "NONE";
const EMAIL_UNVERIFIED = "EMAIL_UNVERIFIED";

const EMAIL_UNVERIFIED_MESSAGE =
  "Please verify your email address, log out, and log back in. Sorry.";

const getErrorCode = async (error: ResponseError): Promise<string> => {
  return (await error.response.json()).code || NO_CODE_GIVEN;
};

const isEmailUnverifiedError = async (
  error: ResponseError
): Promise<boolean> => {
  return (await getErrorCode(error)) === EMAIL_UNVERIFIED;
};

export const useResponseErrorHandler = (taskSummary: string) => {
  const { enqueueSnackbar } = useSnackbar();
  return async (e: unknown) => {
    if (e instanceof ResponseError && (await isEmailUnverifiedError(e))) {
      enqueueSnackbar(EMAIL_UNVERIFIED_MESSAGE, {
        variant: "error",
      });
    } else {
      enqueueSnackbar(`Error ${taskSummary}. Try again later.`, {
        variant: "error",
      });
    }
    console.error(e);
  };
};
