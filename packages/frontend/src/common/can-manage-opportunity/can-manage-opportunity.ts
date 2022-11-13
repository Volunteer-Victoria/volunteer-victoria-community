import { OpportunityResponseDto } from "../../api";

export const canManageOpportunity = (
  permissions: string[],
  userId: string,
  opportunity: OpportunityResponseDto
): boolean => {
  if (permissions.includes("admin")) return true;

  if (opportunity.postedByUserId === userId) return true;

  return false;
};
