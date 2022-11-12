import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

type RequireAuthProps = React.PropsWithChildren;

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  // Return a blank page if currently loading.
  // We could return a loading spinner here instead, but we're trusting that
  // Auth0 won't take long.
  if (isLoading) return <></>;

  if (isAuthenticated) return <>{children}</>;

  return <Navigate to="/login" replace={true} />;
};
