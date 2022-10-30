import { Container, Typography } from "@mui/material";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { SignInCard } from "../../components/SignInCard/SignInCard";

export const SignupPage = () => {
  return (
    <ConstrainedLayout>
      <Typography variant="h1" mt={11.75} mb={7} textAlign="center">
        Join Our Community of Volunteers
      </Typography>
      <Container maxWidth="sm">
        <SignInCard />
      </Container>
    </ConstrainedLayout>
  );
};
