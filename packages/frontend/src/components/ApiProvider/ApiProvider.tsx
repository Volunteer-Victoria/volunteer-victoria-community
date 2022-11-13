import { useAuth0 } from "@auth0/auth0-react";
import { useMemo } from "react";
import {
  Configuration,
  DefaultApi,
  FetchParams,
  ResponseContext,
} from "../../api";
import { ApiContext } from "./ApiContext";

type ApiProviderProps = React.PropsWithChildren;

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  const api = useMemo<DefaultApi>(() => {
    const configuration = new Configuration({
      basePath: process.env.REACT_APP_API_BASE_PATH,
      middleware: [
        {
          async pre(context: ResponseContext): Promise<FetchParams | void> {
            if (isAuthenticated) {
              const accessToken = await getAccessTokenSilently();
              context.init.headers = {
                ...context.init.headers,
                Authorization: `Bearer ${accessToken ?? ""}`,
              };
            }

            return { url: context.url, init: context.init };
          },
        },
      ],
    });

    const api = new DefaultApi(configuration);

    return api;
  }, [getAccessTokenSilently, isAuthenticated]);

  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
