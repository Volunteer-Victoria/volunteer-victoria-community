import {
  FacebookOutlined,
  Instagram,
  LinkedIn,
  Twitter,
} from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Link } from "react-router-dom";

export const FooterSection = () => {
  return (
    <Box
      sx={{ backgroundColor: "primary.main" }}
      padding={{ xs: 3, lg: 8 }}
      paddingBottom={13}
    >
      <Stack
        direction={{ xs: "column", lg: "row" }}
        justifyContent="space-between"
        spacing={2}
      >
        <Box sx={{ minWidth: "300px" }}>
          <Typography color="white" variant="h5">
            Our Address
          </Typography>
          <Typography color="white" variant="subtitle2">
            602-620 View Street, <br />
            Victoria, BC V8W1J6.
          </Typography>
        </Box>
        <Box flexGrow="1">
          <Typography color="white" variant="h5">
            Assistance
          </Typography>
          <Box component="ul" p={0} m={0} pl="8px">
            <Box
              component="li"
              p={0}
              m={0}
              pl="4px"
              sx={{
                listStyleType: '">"',
                color: "white",
                fontSize: "22px",
              }}
            >
              <Link to="/terms-and-conditions" style={{ color: "white" }}>
                <Typography variant="subtitle2">
                  Terms and Conditions
                </Typography>
              </Link>
            </Box>
            <Box
              component="li"
              p={0}
              m={0}
              pl="4px"
              sx={{
                listStyleType: '">"',
                color: "white",
                fontSize: "22px",
              }}
            >
              <Link to="/privacy-policy" style={{ color: "white" }}>
                <Typography variant="subtitle2">Privacy Policy</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
        <Box>
          <Typography color="white" variant="h5" mb={1}>
            Follow Us
          </Typography>
          <Stack
            direction="row"
            component="ul"
            sx={{ m: 0, p: 0, listStyleType: "none" }}
            spacing={1}
          >
            <li>
              <IconButton href="https://www.facebook.com/VolunteerVictoriaBC/">
                <FacebookOutlined sx={{ fontSize: 32, color: "white" }} />
              </IconButton>
            </li>
            <li>
              <IconButton href="https://www.instagram.com/volunteervictoria/">
                <Instagram sx={{ fontSize: 32, color: "white" }} />
              </IconButton>
            </li>
            <li>
              <IconButton href="https://twitter.com/volvicbc">
                <Twitter sx={{ fontSize: 32, color: "white" }} />
              </IconButton>
            </li>
            <li>
              <IconButton href="https://ca.linkedin.com/company/volunteer-victoria">
                <LinkedIn sx={{ fontSize: 32, color: "white" }} />
              </IconButton>
            </li>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
