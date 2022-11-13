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
import { useApi } from "../ApiProvider";

interface SimpleOpportunityProps {
  opportunity: OpportunityResponseDto;
  canManage: boolean;
}

export const SimpleOpportunity = ({
  opportunity,
  canManage,
}: SimpleOpportunityProps) => {
  const navigate = useNavigate();
  const api = useApi();

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

    api.opportunityControllerDeleteId({
      id: opportunity.opportunityId,
    });
    navigate("/opportunities");
  };

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
          {canManage && (
            <Grid item>
              <IconButton
                aria-label="Edit this opportunity"
                color="primary"
                component={Link}
                to={`/opportunity/${opportunity.opportunityId}/edit`}
              >
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
          )}
        </Grid>
        <Stack direction={{ xs: "column", lg: "row" }} spacing={3} pt={5}>
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
