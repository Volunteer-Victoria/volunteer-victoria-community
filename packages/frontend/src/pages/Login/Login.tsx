import { useAuth0 } from "@auth0/auth0-react";
import { Typography, Container } from "@mui/material";
import { Navigate } from "react-router-dom";
import { SignInCard } from "../../components/SignInCard/SignInCard";

export const LoginPage = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  if (isLoading) {
    return <></>;
  }

  if (isAuthenticated) {
    return <Navigate to="/opportunities/" replace={true} />;
  }

  return (
    <>
      <Typography
        variant="h1"
        mt={11.75}
        mb={7}
        textAlign="center"
        gutterBottom
      >
        Join Our Community of Volunteers
      </Typography>
      <Container maxWidth="sm">
        <SignInCard />
      </Container>
    </>
  );
};
