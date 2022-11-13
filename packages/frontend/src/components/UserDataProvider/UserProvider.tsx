import { useAuth0 } from "@auth0/auth0-react";
import { useCallback, useEffect, useState } from "react";
import { readToken } from "./read-token";
import { UserContext } from "./UserContext";

type UserProviderProps = React.PropsWithChildren;

export const UserProvider = ({ children }: UserProviderProps) => {
  const { user, getAccessTokenSilently } = useAuth0();
  const [permissions, setPermissions] = useState<string[]>([]);
  const [id, setId] = useState<string | undefined>();

  const fetchRoles = useCallback(async () => {
    const accessToken = await getAccessTokenSilently();
    const { id, permissions } = readToken(accessToken);
    setPermissions(permissions);
    setId(id);
  }, [getAccessTokenSilently]);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles, user]);

  return (
    <UserContext.Provider value={{ data: user, permissions, id }}>
      {children}
    </UserContext.Provider>
  );
};
