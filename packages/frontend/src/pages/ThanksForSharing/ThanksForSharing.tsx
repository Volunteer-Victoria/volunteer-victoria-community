import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { Link, Navigate, useLoaderData } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { ReturnableLayout } from "../../components/ReturnableLayout";
import { useUser } from "../../components/UserDataProvider/use-user";

export const ThanksForSharingPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;
  const user = useUser();

  if (!user.data || user.id !== opportunity.postedByUserId) {
    return <Navigate to={`/opportunity/${opportunity.opportunityId}`} />;
  }

  return (
    <Container maxWidth="md">
      <ReturnableLayout label="Back to all opportunities">
        <Box pb={4}>
          <Card>
            <Box px={{ xs: 3, lg: 4 }} py={{ xs: 2, lg: 3 }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
              >
                <Grid item>
                  <Typography variant="h1" gutterBottom>
                    Thank You for Sharing!
                  </Typography>
                  <Typography variant="subtitle1">
                    Your opportunity is now live on our platform
                  </Typography>
                </Grid>

                <Grid item>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/opportunity/${opportunity.opportunityId}`}
                  >
                    View my posting
                  </Button>
                </Grid>
              </Grid>
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
