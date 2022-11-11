import { Box, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { OpportunitiesList } from "../../components/OpportunitiesList";
import { RequireAuth } from "../../components/RequireAuth";

export const OpportunitiesPage = () => {
  const opportunities = useLoaderData() as OpportunityResponseDto[];

  return (
    <ConstrainedLayout>
      <RequireAuth>
        <Box py={5}>
          <Typography variant="h1">Volunteer Opportunities</Typography>
          <Box py={5}>
            <OpportunitiesList opportunities={opportunities} />
          </Box>
        </Box>
      </RequireAuth>
    </ConstrainedLayout>
  );
};
