import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { OpportunityResponseDto } from "../../api";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { Loader } from "../../components/Loader";
import { OpportunitiesList } from "../../components/OpportunitiesList";
import { RequireAuth } from "../../components/RequireAuth";

export const OpportunitiesPage = () => {
  const initialOpportunities = useLoaderData() as OpportunityResponseDto[];

  const [loading] = useState(false);
  const [opportunities] =
    useState<OpportunityResponseDto[]>(initialOpportunities);

  // const fetchData = useCallback(async () => {
  //   setLoading(true);
  //   const opps = await api.opportunityControllerGet();
  //   setOpportunities(opps);
  //   setLoading(false);
  // }, [api]);

  return (
    <ConstrainedLayout>
      <RequireAuth>
        <Box py={5}>
          <Typography variant="h1">Volunteer Opportunities</Typography>
          <Box py={5}>
            <Loader loading={loading}>
              <OpportunitiesList opportunities={opportunities} />
            </Loader>
          </Box>
        </Box>
      </RequireAuth>
    </ConstrainedLayout>
  );
};
