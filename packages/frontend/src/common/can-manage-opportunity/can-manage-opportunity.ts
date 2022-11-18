import { OpportunityResponseDto } from "../../api";
import { IUserContext } from "../../components/UserDataProvider/UserContext";

export const canManageOpportunity = (
  user: IUserContext | undefined,
  opportunity: OpportunityResponseDto
): boolean => {
  if (!user) return false;

  if (user?.permissions?.includes("admin")) return true;

  if (opportunity.postedByUserId === user.id) return true;

  return false;
};
