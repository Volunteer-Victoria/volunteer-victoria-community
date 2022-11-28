import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { readToken } from "./read-token";
import { UserContext } from "./UserContext";

type UserProviderProps = React.PropsWithChildren;

/**
 * Provides User context to the application.  The user context consists of the
 * Auth0 user data, the user ID, and the users permissions.
 *
 * If, in the future, we support our own user data we need to fetch via API,
 * this would be a good place to add that.
 */
export const UserProvider = ({ children }: UserProviderProps) => {
  const { user, getAccessTokenSilently, isLoading, isAuthenticated } =
    useAuth0();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [id, setId] = useState<string | undefined>();
  const [ready, setReady] = useState(false);

  // Extract the users permissions and ID from the JWT token
  const populateUser = useCallback(async () => {
    if (!isAuthenticated) {
      setReady(true);
      return;
    }
    const accessToken = await getAccessTokenSilently();
    const { id, permissions } = readToken(accessToken);
    setPermissions(permissions);
    setId(id);
    setReady(true);
  }, [getAccessTokenSilently, isAuthenticated]);

  useEffect(() => {
    if (!isLoading) {
      populateUser();
    }
  }, [populateUser, isLoading, isAuthenticated]);

  if (!ready) {
    return null;
  }

  return (
    <UserContext.Provider value={{ data: user, permissions, id }}>
      {children}
    </UserContext.Provider>
  );
};
