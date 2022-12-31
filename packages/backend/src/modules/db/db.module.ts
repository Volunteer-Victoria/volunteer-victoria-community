import { TypeOrmModule } from "@nestjs/typeorm";
import { OpportunityResponseDto } from "../opportunity/opportunity.dto";
import { CreateOpportunityTable1672450383070 } from "./migrations/1672450383070-CreateOpportunityTable";

export const DbModule = TypeOrmModule.forRoot({
  type: "cockroachdb",
  host: process.env["DB_HOST"],
  port: Number.parseInt(process.env["DB_PORT"]!),
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_DATABASE"],
  entities: [OpportunityResponseDto],
  migrations: [CreateOpportunityTable1672450383070],
});
