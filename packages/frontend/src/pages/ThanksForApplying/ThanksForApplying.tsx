import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ReturnableLayout } from "../../components/ReturnableLayout";

export const ThanksForApplyingPage = () => {
  return (
    <Container maxWidth="md">
      <ReturnableLayout label="Back to all opportunities">
        <Box pb={4}>
          <Card>
            <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
              <Typography variant="h1" gutterBottom>
                Thank You for Applying!
              </Typography>
              <Typography variant="subtitle1">
                We have shared your details with the opportunity poster
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Grid
                container
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                spacing={2}
                flexWrap="nowrap"
              >
                <Grid item>
                  <Typography variant="body1" pb={3}>
                    Help us improve your experience on the platform. Request a
                    feature or report an issue
                  </Typography>
                </Grid>
                <Grid item flexShrink="0">
                  <Button
                    variant="outlined"
                    href="https://volunteer-victoria-community.canny.io/feature-requests"
                  >
                    Share feedback
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Box>
      </ReturnableLayout>
    </Container>
  );
};
