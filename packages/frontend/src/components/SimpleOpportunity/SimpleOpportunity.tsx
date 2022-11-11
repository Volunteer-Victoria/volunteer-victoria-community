import {
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link, useNavigate } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";

interface SimpleOpportunityProps {
  opportunity: OpportunityResponseDto;
}

export const SimpleOpportunity = ({ opportunity }: SimpleOpportunityProps) => {
  const navigate = useNavigate();

  const date = new Date(opportunity.startTime).toLocaleDateString("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const onDelete = async () => {
    const confirmation = window.confirm(
      "Do you want to delete this opportunity?"
    );
    if (!confirmation) return;

    fetch(
      `https://dev.vvc.sonnex.name/api/v1/opportunity/${opportunity.opportunityId}`,
      { method: "DELETE" }
    );
    navigate("/opportunities");
  };

  return (
    <Card>
      <Box px={4.5} py={3}>
        <Grid container direction="row">
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
            <IconButton aria-label="Edit this opportunity" color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              aria-label="Delete this opportunity"
              color="primary"
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={3} pt={5}>
          {date && (
            <Box>
              <Typography variant="subtitle2">
                <CalendarTodayIcon sx={{ verticalAlign: "middle", mr: 1 }} />
                {date}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2">
              <PeopleOutlineIcon sx={{ verticalAlign: "middle", mr: 1 }} />
              Recruiting {opportunity.requiredPeopleCount} people
            </Typography>
          </Box>
          <Box flexGrow={1}></Box>

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
