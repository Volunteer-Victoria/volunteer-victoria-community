import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { OpportunityEntity } from "../opportunity/opportunity.entity";
import { CreateOpportunityTable1672450383070 } from "./migrations/1672450383070-CreateOpportunityTable";

export const entities = [OpportunityEntity];

export const DbModule = TypeOrmModule.forRoot({
  type: "cockroachdb",
  entities,
  migrations: [CreateOpportunityTable1672450383070],
  host: process.env["DB_HOST"],
  port: Number.parseInt(process.env["DB_PORT"]!),
  username: process.env["DB_USERNAME"],
  password: process.env["DB_PASSWORD"],
  database: process.env["DB_DATABASE"],
  synchronize: false,
} as TypeOrmModuleOptions);

// TODO unit test migrations
