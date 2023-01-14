import {
  CalendarTodayOutlined,
  CallOutlined,
  SendOutlined,
} from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Section } from "../Section";
import { ListItem } from "./ListItem";

export const QuerySection = () => {
  return (
    <Section background="white">
      <Typography variant="h2" textAlign="center" color="primary" mb={14}>
        Have A Query? Get In Touch
      </Typography>
      <Stack direction="row">
        <Box flex="1 1 0">
          <Typography variant="subtitle1" gutterBottom>
            Meet with our volunteering advisor to find the right volunteering
            position based on your personal goals and skills.
          </Typography>

          <Typography variant="subtitle1">
            Book an appointment today!
          </Typography>
        </Box>
        <Stack component="ul" m={0} p={0} flex="1 1 0" spacing={3}>
          <ListItem Icon={CallOutlined}>
            Dial <Link href="tel:12503862269">250-386-2269</Link>
          </ListItem>
          <ListItem Icon={SendOutlined}>
            Write to{" "}
            <Link href="mailto:volvic@volunteervictoria.bc.ca">
              volvic@volunteervictoria.bc.ca
            </Link>
          </ListItem>
          <ListItem Icon={CalendarTodayOutlined}>
            Book a virtual appointement{" "}
            <Link href="https://booking.setmore.com/scheduleappointment/9fae5891-d9a6-49b9-b536-f7067453c0c0">
              here
            </Link>
          </ListItem>
        </Stack>
      </Stack>
    </Section>
  );
};
