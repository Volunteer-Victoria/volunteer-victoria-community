import { useAuth0 } from "@auth0/auth0-react";
import { Navigate } from "react-router-dom";

type RequireAuthProps = React.PropsWithChildren;

export const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <>Loading...</>;

  if (isAuthenticated) return <>{children}</>;

  return <Navigate to="/login" replace={true} />;
};
