import { Grid, Typography } from "@mui/material";
import { Section } from "./Section";
import GovCanada from "../../../assets/gov-canada.png";

export const AttributionSection = () => {
  return (
    <Section background="white">
      <Typography
        variant="h2"
        color="primary"
        textAlign="center"
        mb={{ xs: 2, lg: 10 }}
      >
        Attribution
      </Typography>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography variant="subtitle2" gutterBottom>
            We are deeply thankful for the guidance, help and funding we’ve
            received to build a supportive and accessible community for our
            seniors in Victoria.
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          alignItems="center"
          justifyItems="center"
          display="flex"
        >
          <img
            src={GovCanada}
            alt="Funded by the government of Canada New Horizons for Seniors Program"
            loading="lazy"
          />
        </Grid>
      </Grid>
    </Section>
  );
};
