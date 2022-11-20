import { Box, Button, Card, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <Box>
      <Typography
        variant="h1"
        mt={11.75}
        mb={7}
        textAlign="center"
        gutterBottom
      >
        Something went wrong
      </Typography>
      <Container maxWidth="sm">
        <Card
          sx={{
            py: 6,
            px: 4.5,
          }}
        >
          <Typography variant="h2" textAlign="center">
            The page you're looking for may not exist
          </Typography>
          <Box mt={4} textAlign="center">
            <Button component={Link} to="/" variant="contained">
              Back to home
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
};
