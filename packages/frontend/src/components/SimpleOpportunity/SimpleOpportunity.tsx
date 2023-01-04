import { Box, Button, Card, Grid, Stack, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import { Link } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { formatYMD } from "../../common";
import { ManageOpportunity } from "../ManageOpportunity/ManageOpportunity";

interface SimpleOpportunityProps {
  opportunity: OpportunityResponseDto;
}

export const SimpleOpportunity = ({ opportunity }: SimpleOpportunityProps) => {
  return (
    <Card>
      <Box px={{ xs: 3, lg: 4 }} py={3}>
        <Grid container direction={{ xs: "column", lg: "row" }}>
          <Grid item>
            <Typography variant="h2">
              {opportunity.title || "Volunteer Opportunity"}
            </Typography>
            {opportunity.contactName && (
              <Typography>for {opportunity.contactName}</Typography>
            )}
          </Grid>
          <Grid item flexGrow={1} />
          <Grid item>
            <ManageOpportunity opportunity={opportunity} />
          </Grid>
        </Grid>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3} pt={5}>
          {opportunity.occursDate && (
            <Box>
              <Typography variant="subtitle2" component="span">
                <CalendarTodayIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                {formatYMD(opportunity.occursDate)}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2" component="span">
              <PeopleOutlineIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Recruiting {opportunity.requiredPeopleCount} people
            </Typography>
          </Box>
          <Box flexGrow={1} display={{ xs: "none", lg: "flex" }}></Box>

          <Box>
            <Button
              component={Link}
              to={`/opportunity/${opportunity.opportunityId}`}
              variant="contained"
            >
              View Details
            </Button>
          </Box>
        </Stack>
      </Box>
    </Card>
  );
};
