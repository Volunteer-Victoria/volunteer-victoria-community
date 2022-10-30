import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { RequireAuth } from "../../components/RequireAuth";

export const OpportunitiesPage = () => {
  return (
    <ConstrainedLayout>
      <RequireAuth>
        <Typography variant="h1">Opportunities</Typography>
        <Link to="create">Create</Link>
        <br />
        <Link to="../opportunity/123">Opportunity 123</Link>
        <br />
        <Link to="../opportunity/123/participants">
          Opportunity 123 Participants
        </Link>
      </RequireAuth>
    </ConstrainedLayout>
  );
};
