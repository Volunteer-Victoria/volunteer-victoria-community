import VolunteerActivismOutlined from "@mui/icons-material/VolunteerActivismOutlined";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import CreateOutlined from "@mui/icons-material/CreateOutlined";
import PublishOutlined from "@mui/icons-material/PublishOutlined";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { Step } from "./Step";
import { Section } from "../Section";

export const HowToApplySection = () => {
  return (
    <Section background="shaded">
      <Box px={{ xs: 0, md: 8 }}>
        <Box mb={{ xs: 8, lg: 15 }}>
          <Typography
            variant="h2"
            mb={{ xs: 2, md: 7 }}
            gutterBottom
            color="primary"
            textAlign="center"
          >
            How To Apply For Opportunities
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 5, lg: 10 }}
            divider={<Divider flexItem />}
          >
            <Step Icon={PersonOutlined} title="CREATE YOUR ACCOUNT">
              <Typography variant="subtitle1">
                Select ‘Sign Up’ to apply for available volunteering roles.
              </Typography>
            </Step>
            <Step Icon={VolunteerActivismOutlined} title="VIEW OPPORTUNITIES">
              <Typography variant="subtitle1">
                Explore different ways to support your community based on your
                interests/skills.
              </Typography>
            </Step>
            <Step Icon={ListAltOutlined} title="APPLY TO AN OPPORTUNITY">
              <Typography variant="subtitle1">
                Apply for a specific role by selecting ‘Express Interest’ and
                submitting your application form.
              </Typography>
            </Step>
          </Stack>
        </Box>
        <Box>
          <Typography
            variant="h2"
            mb={{ xs: 2, md: 7 }}
            gutterBottom
            color="primary"
            textAlign="center"
          >
            How To Post Opportunities
          </Typography>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={{ xs: 2, md: 5, lg: 10 }}
            divider={<Divider flexItem />}
          >
            <Step Icon={PersonOutlined} title="CREATE YOUR ACCOUNT">
              <Typography variant="subtitle1">
                Select ‘Sign Up’ to start sharing opportunities.
              </Typography>
            </Step>
            <Step Icon={CreateOutlined} title="CREATE AN OPPORTUNITY">
              <Typography variant="subtitle1">
                Select ‘Post an Opportunity’ to begin adding details regarding
                the help needed.
              </Typography>
            </Step>
            <Step Icon={PublishOutlined} title="POST AN OPPORTUNITY">
              <Typography variant="subtitle1">
                Fill out the form and select ‘Post’ to make the opportunity live
                on the platform.
              </Typography>
            </Step>
          </Stack>
        </Box>
      </Box>
    </Section>
  );
};
