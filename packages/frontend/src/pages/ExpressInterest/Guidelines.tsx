import { Box, Alert } from "@mui/material";

export function Guidelines() {
  return (
    <Alert severity="info">
      General Guidelines
      <Box
        component="ul"
        sx={{
          pl: 2,
        }}
      >
        <li>
          All volunteers between 15-18 years old must have parental permission
          before volunteering
        </li>
        <li>A parent or guardian must accompany all volunteers under age 15</li>
      </Box>
    </Alert>
  );
}
