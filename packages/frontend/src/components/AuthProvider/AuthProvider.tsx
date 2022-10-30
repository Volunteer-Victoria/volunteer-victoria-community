import { Auth0Provider } from "@auth0/auth0-react";

type AuthProviderProps = React.PropsWithChildren;
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENTID;

  if (!domain || !clientId) {
    throw new Error("Authorization settings missing");
  }
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      {children}
    </Auth0Provider>
  );
};
