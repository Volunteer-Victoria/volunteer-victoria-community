import { Box, Button, Card, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const SignInCard = () => {
  return (
    <Card
      sx={{
        py: 6,
        px: 4.5,
      }}
    >
      <Typography variant="h2" textAlign="center">
        Sign In With Facebook
      </Typography>
      <Typography textAlign="center">
        We use Facebook sign in to make signing into our community fast and
        secure.
      </Typography>
      <Box mt={4} textAlign="center">
        <Button component={Link} to="../opportunities" variant="contained">
          Sign In
        </Button>
      </Box>
    </Card>
  );
};
