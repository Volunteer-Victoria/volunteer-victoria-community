import { Auth0Provider } from "@auth0/auth0-react";

type AuthProviderProps = React.PropsWithChildren;
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENTID;
  const audience = process.env.REACT_APP_AUTH0_AUDIENCE;

  if (!domain || !clientId || !audience) {
    throw new Error("Authorization settings missing");
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      audience={audience}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};
