import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import LandingJoinGroceries from "../../../../assets/landing-join-groceries.svg";
import LandingJoinList from "../../../../assets/landing-join-list.svg";
import { Section } from "../Section";
import { ImageAndText } from "./ImageAndText";

export const JoinSection = () => {
  return (
    <Section background="white">
      <Typography
        variant="h2"
        textAlign="center"
        color="primary"
        mb={{ xs: 2, md: 14 }}
      >
        Join Our Volunteer Community
      </Typography>
      <Grid container justifyContent="space-between" spacing={{ xs: 4, lg: 0 }}>
        <Grid item xs={12} lg="auto" sx={{ width: { lg: 424 } }}>
          <ImageAndText
            img={LandingJoinList}
            alt="Person posting volunteer opportunities on a board"
            title="POST OPPORTUNITIES"
            action={
              <Button
                variant="outlined"
                component={Link}
                to="opportunities/create"
                relative="route"
              >
                POST AN OPPORTUNITY
              </Button>
            }
          >
            <Typography variant="body2">
              Get the help and support you need. Provide task-related
              information and requirements to find truly interested and rightly
              skilled volunteers for your upcoming needs.
            </Typography>
          </ImageAndText>
        </Grid>
        <Grid item xs={12} lg="auto" sx={{ width: { lg: 424 } }}>
          <ImageAndText
            img={LandingJoinGroceries}
            alt="Volunteer helping carry groceries"
            title="FIND OPPORTUNITIES"
            action={
              <Button
                variant="outlined"
                component={Link}
                to="opportunities"
                relative="route"
              >
                VIEW OPPORTUNITIES
              </Button>
            }
          >
            <Typography variant="body2" mb={{ xs: 2, md: 5 }}>
              We help Victoria’s volunteers serve the local community by
              providing real-time opportunities for meaningful contributions.
              Join to make an impact.
            </Typography>
          </ImageAndText>
        </Grid>
      </Grid>
    </Section>
  );
};
