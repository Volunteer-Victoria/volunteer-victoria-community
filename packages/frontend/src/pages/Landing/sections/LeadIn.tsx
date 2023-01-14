import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Section } from "./Section";

export const LeadInSection = () => {
  return (
    <Section background="shaded" maxWidth="md">
      <Typography variant="body1" mb={7} gutterBottom>
        <Typography color="primary" component="span">
          Volunteer Victoria
        </Typography>{" "}
        inspires and raises new generations of volunteers.
      </Typography>
      <Typography variant="body2" gutterBottom>
        We support volunteer-led organizations, groups and projects by providing
        tools and training to volunteers and staff which helps them create
        meaningful and fulfilling opportunities.
      </Typography>
      <Box textAlign="center" mt={6}>
        <Button
          variant="contained"
          component={Link}
          to="login"
          relative="route"
        >
          SIGN UP
        </Button>
      </Box>
    </Section>
  );
};
