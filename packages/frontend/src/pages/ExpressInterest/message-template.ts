import { OpportunityResponseDto } from "../../api";

export const createDefaultMessageTemplate = (
  opportunity: OpportunityResponseDto
): string => `Hello;

I'm interested in the opportunity "${opportunity.title}" and would like to know if there is anything I can do to help.

I'm ...`;
