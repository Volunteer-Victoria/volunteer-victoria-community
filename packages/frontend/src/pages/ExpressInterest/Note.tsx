import { Box, Alert } from "@mui/material";

export function Note() {
  return (
    <Alert severity="info">
      Please Note
      <Box
        component="ul"
        sx={{
          pl: 2,
        }}
      >
        <li>We will be emailing the opportunity poster on your behalf</li>
        <li>Opportunity posters will receive your application via email</li>
        <li>Opportunity posters cannot view your contact information</li>
      </Box>
    </Alert>
  );
}
