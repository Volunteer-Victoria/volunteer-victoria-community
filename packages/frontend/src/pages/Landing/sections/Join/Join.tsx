import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Link } from "react-router-dom";
import LandingJoinGroceries from "../../../../assets/landing-join-groceries.svg";
import LandingJoinList from "../../../../assets/landing-join-list.svg";
import { Section } from "../Section";
import { ImageAndText } from "./ImageAndText";

export const JoinSection = () => {
  return (
    <Section background="white">
      <Typography variant="h2" textAlign="center" color="primary" mb={14}>
        Join Our Volunteer Community
      </Typography>
      <Stack spacing={26}>
        <ImageAndText
          img={LandingJoinGroceries}
          alt="Volunteer helping carry groceries"
          title="FIND OPPORTUNITIES"
        >
          <Typography variant="body2" mb={5}>
            We help Victoria’s volunteers serve the local community by providing
            real-time opportunities for meaningful contributions.
          </Typography>

          <Typography variant="body2" mb={4}>
            Join to make an impact.
          </Typography>
          <Button
            variant="outlined"
            component={Link}
            to="opportunities"
            relative="route"
          >
            FIND OPPORTUNITIES
          </Button>
        </ImageAndText>
        <ImageAndText
          img={LandingJoinList}
          alt="Person posting volunteer opportunities on a board"
          title="SHARE OPPORTUNITIES"
          reverse
        >
          <Typography variant="body2" mb={5}>
            Get the help and support you need.
          </Typography>

          <Typography variant="body2" mb={4}>
            Provide task-related information and requirements to find truly
            interested and rightly skilled volunteers for your upcoming needs.
          </Typography>

          <Button
            variant="outlined"
            component={Link}
            to="opportunities/create"
            relative="route"
          >
            POST AN OPPORTUNITY
          </Button>
        </ImageAndText>
      </Stack>
    </Section>
  );
};
