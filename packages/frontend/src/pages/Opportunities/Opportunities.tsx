import { Box, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { OpportunityResponseDto } from "../../api";
import { useApi } from "../../components/ApiProvider";
import { ConstrainedLayout } from "../../components/ConstrainedLayout";
import { Loader } from "../../components/Loader";
import { OpportunitiesList } from "../../components/OpportunitiesList";
import { RequireAuth } from "../../components/RequireAuth";
import { useMount } from "../../hooks";

export const OpportunitiesPage = () => {
  const api = useApi();

  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<OpportunityResponseDto[]>(
    []
  );

  const fetchData = useCallback(async () => {
    setLoading(true);
    const opps = await api.opportunityControllerGet();
    setOpportunities(opps);
    setLoading(false);
  }, [api]);

  useMount(() => {
    fetchData();
  });

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
