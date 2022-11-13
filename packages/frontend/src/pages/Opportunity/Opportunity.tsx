import {
  Box,
  Card,
  Typography,
  Divider,
  Grid,
  Stack,
  Button,
} from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { RequireAuth } from "../../components/RequireAuth";
import { ReturnableLayout } from "../../components/ReturnableLayout";
import { DefinitionItem } from "./DefinitionItem";
import { InterestDialog } from "./InterestDialog";

export const OpportunityPage = () => {
  const opportunity = useLoaderData() as OpportunityResponseDto;

  const [dialogOpen, setDialogOpen] = useState(false);

  const date = "Not implemented";
  const time = "Not implemented";

  return (
    <RequireAuth>
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
              >
                <Grid item>
                  <Typography variant="h1" gutterBottom>
                    {opportunity.title}
                  </Typography>
                  {opportunity.contactName && (
                    <Typography>for {opportunity.contactName}</Typography>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    variant="contained"
                    onClick={() => setDialogOpen(true)}
                  >
                    Express interest
                  </Button>
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
      </ReturnableLayout>
      <InterestDialog
        open={dialogOpen}
        onOk={() => setDialogOpen(false)}
        onClose={() => setDialogOpen(false)}
        name={opportunity.contactName}
        phoneNumber={opportunity.contactPhone}
        email={opportunity.contactEmail}
      />
    </RequireAuth>
  );
};
