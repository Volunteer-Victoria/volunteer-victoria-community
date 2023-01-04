import { Entity } from "typeorm";
import { OpportunityResponseDto } from "./opportunity.dto";

@Entity({ name: "opportunity" })
export class OpportunityEntity extends OpportunityResponseDto {}
