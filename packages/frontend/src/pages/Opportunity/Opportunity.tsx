import { Box, Card, Typography, Divider, Grid, Stack } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { RequireAuth } from "../../components/RequireAuth";
import { ReturnLink } from "../../components/ReturnLink";
import { DefinitionItem } from "./DefinitionItem";

export const OpportunityPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;

  const date = "Not implemented";
  const time = "Not implemented";

  return (
    <ConstrainedLayout>
      <RequireAuth>
        <Box pt={3} pb={2.5}>
          <ReturnLink to="../opportunities">
            Back to all opportunities
          </ReturnLink>
        </Box>
        <Box pb={4}>
          <Card>
            <Box p={5}>
              <Typography variant="h1">{opportunity.title}</Typography>
              <Box py={1}>
                {opportunity.contactName && (
                  <Typography>for {opportunity.contactName}</Typography>
                )}
              </Box>
              <Divider sx={{ my: 3 }} />
              <Grid container>
                <Grid item xs={12} md={9}>
                  <Typography variant="h2">Description</Typography>
                  <Typography>{opportunity.description}</Typography>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Typography variant="h2">Details</Typography>
                  <Stack component="dl" spacing={2}>
                    <DefinitionItem
                      title="Location"
                      details={opportunity.locationName}
                    />
                    <DefinitionItem title="Date" details={date} />
                    <DefinitionItem title="Time" details={time} />
                    <DefinitionItem
                      title="People required"
                      details={opportunity.requiredPeopleCount.toString()}
                    />
                    <DefinitionItem
                      title="Environment"
                      details={opportunity.indoorsOrOutdoors}
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
      </RequireAuth>
    </ConstrainedLayout>
  );
};
