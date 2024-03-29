import {
  Box,
  Card,
  Typography,
  Divider,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { Link, useLoaderData } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { formatIndoorsOutdoorsOnline, formatYMD } from "../../common";
import { ManageOpportunity } from "../../components/ManageOpportunity/ManageOpportunity";
import { ReturnableLayout } from "../../components/ReturnableLayout";
import { useUser } from "../../components/UserDataProvider/use-user";
import { DefinitionItem } from "./DefinitionItem";

export const OpportunityPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;
  const user = useUser();

  return (
    <ReturnableLayout>
      <Box pb={4}>
        <Card>
          <Box px={{ xs: 3, lg: 4 }} py={3}>
            <Grid
              container
              alignItems={{ xs: "flex-start", lg: "flex-end" }}
              justifyContent="space-between"
              direction={{ xs: "column", lg: "row" }}
              spacing={{ xs: 3, lg: 0 }}
              flexWrap="nowrap"
            >
              <Grid item>
                <Typography variant="h1" gutterBottom>
                  {opportunity.title}
                </Typography>
                {opportunity.contactName && (
                  <Typography>for {opportunity.contactName}</Typography>
                )}
              </Grid>
              <Grid item flexShrink={0}>
                <Stack spacing={2} direction="column" alignItems="flex-end">
                  <div>
                    <ManageOpportunity opportunity={opportunity} />
                  </div>
                  {user.data ? (
                    <Button
                      variant="contained"
                      component={Link}
                      to="apply"
                      relative="route"
                    >
                      CONTACT
                    </Button>
                  ) : (
                    <Button variant="contained" component={Link} to="/login">
                      LOG IN
                    </Button>
                  )}
                </Stack>
              </Grid>
            </Grid>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={{ xs: 3, lg: 0 }}>
              <Grid item xs={12} md={9}>
                <Typography variant="h2">Description</Typography>
                <Typography>{opportunity.description}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography variant="h2">Details</Typography>
                <Stack component="dl" spacing={{ xs: 1, lg: 2 }}>
                  <DefinitionItem
                    title="Location"
                    details={opportunity.locationName}
                  />
                  <DefinitionItem
                    title="Date"
                    details={formatYMD(opportunity.occursDate)}
                  />
                  <DefinitionItem
                    title="Time"
                    details={opportunity.occursTime}
                  />
                  <DefinitionItem
                    title="People required"
                    details={opportunity.requiredPeopleCount.toString()}
                  />
                  <DefinitionItem
                    title="Environment"
                    details={formatIndoorsOutdoorsOnline(
                      opportunity.indoorsOutdoorsOnline
                    )}
                  />
                  <DefinitionItem
                    title="Criminal Record Check required"
                    details={
                      opportunity.criminalRecordCheckRequired ? "yes" : "no"
                    }
                  />
                  <DefinitionItem
                    title="Ideal volunteer"
                    details={opportunity.idealVolunteer ?? ""}
                  />
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Card>
      </Box>
    </ReturnableLayout>
  );
};
