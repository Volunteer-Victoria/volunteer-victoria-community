import { Box, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Section } from "./Section";

export const AcknowedgementSection = () => {
  return (
    <Section background="shaded">
      <Typography variant="h2" color="primary" textAlign="center" mb={10}>
        Territorial Acknowledgement
      </Typography>
      <Stack direction="row" spacing="3">
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            We live, work, and volunteer as uninvited guests in the traditional
            territory of the Songhees, Esquimalt, and W̱sáneć Nations.
          </Typography>
          <Typography variant="subtitle2">
            Generations of Lekwungen Peoples serve as the stewards of the land
            and sea and are our leaders, neighbours, and fellow volunteers.
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Volunteer Victoria commits to playing an active role on the path
            towards truth, reconciliation, and decolonization.
          </Typography>
          <Typography variant="subtitle2">
            We work to hold a courageous space where everyone feels welcomed,
            included, respected, and heard.
          </Typography>
        </Box>
      </Stack>
    </Section>
  );
};
