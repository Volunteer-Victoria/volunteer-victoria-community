import { Stack } from "@mui/material";
import { OpportunityResponseDto } from "../../api";
import { canManageOpportunity } from "../../common";

import { SimpleOpportunity } from "../SimpleOpportunity";
import { useUser } from "../UserDataProvider/use-user";

interface OpportunitiesListProps {
  opportunities: OpportunityResponseDto[];
}

export const OpportunitiesList = ({
  opportunities,
}: OpportunitiesListProps) => {
  const userData = useUser();

  return (
    <Stack spacing={2}>
      {opportunities.map((opportunity) => (
        <SimpleOpportunity
          key={opportunity.title}
          opportunity={opportunity}
          canManage={canManageOpportunity(
            userData.permissions,
            "123",
            opportunity
          )}
        />
      ))}
    </Stack>
  );
};
