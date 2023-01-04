import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { OpportunityEntity } from "../opportunity/opportunity.entity";
import { CreateOpportunityTable1672450383070 } from "./migrations/1672450383070-CreateOpportunityTable";

export const DbModule = TypeOrmModule.forRootAsync({
  useFactory: () =>
    ({
      type: "cockroachdb",
      entities: [OpportunityEntity],
      migrations: [CreateOpportunityTable1672450383070],
      migrationsRun: true,
      synchronize: false,

      host: process.env["DB_HOST"],
      port: Number.parseInt(process.env["DB_PORT"]!),
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
    } as TypeOrmModuleOptions),
});

// TODO unit test migrations
