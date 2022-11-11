import { Stack } from "@mui/material";
import { OpportunityResponseDto } from "../../api";
import { SimpleOpportunity } from "../SimpleOpportunity";

interface OpportunitiesListProps {
  opportunities: OpportunityResponseDto[];
}

export const OpportunitiesList = ({
  opportunities,
}: OpportunitiesListProps) => {
  return (
    <Stack spacing={2}>
      {opportunities.map((opportunity) => (
        <SimpleOpportunity key={opportunity.title} opportunity={opportunity} />
      ))}
    </Stack>
  );
};
