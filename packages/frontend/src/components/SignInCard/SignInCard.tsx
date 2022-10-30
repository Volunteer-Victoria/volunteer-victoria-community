import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, Card, Typography } from "@mui/material";

export const SignInCard = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Card
      sx={{
        py: 6,
        px: 4.5,
      }}
    >
      <Typography variant="h2" textAlign="center">
        Sign In With Whatever You Want
      </Typography>
      <Typography textAlign="center">
        Some text about our sign up system?
      </Typography>
      <Box mt={4} textAlign="center">
        <Button
          variant="contained"
          onClick={() => loginWithRedirect({ screen_hint: "login" })}
        >
          Sign In
        </Button>
        <br />
        <br />
        <Button
          variant="contained"
          onClick={() => loginWithRedirect({ screen_hint: "signup" })}
        >
          Create Account
        </Button>
      </Box>
    </Card>
  );
};
