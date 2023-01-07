import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { isRunningLocally } from "../../util";
import { OpportunityEntity } from "../opportunity/opportunity.entity";
import { CreateOpportunityTable1672450383070 } from "./migrations/1672450383070-CreateOpportunityTable";
import { CreateMessageTables1673051031712 } from "./migrations/1673051031712-CreateMessageThreadTable";

const dbInMemory = process.env["DB_INMEMORY"] !== undefined;

export const CockroachDbModule = TypeOrmModule.forRootAsync({
  useFactory: () =>
    ({
      type: "cockroachdb",
      entities: [OpportunityEntity],
      migrations: [
        CreateOpportunityTable1672450383070,
        CreateMessageTables1673051031712,
      ],
      migrationsRun: true,
      synchronize: false,

      host: process.env["DB_HOST"],
      port: Number.parseInt(process.env["DB_PORT"]!),
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      ssl: !isRunningLocally,
    } as TypeOrmModuleOptions),
});

export const InMemoryDbModule = TypeOrmModule.forRoot({
  type: "better-sqlite3",
  database: ":memory:",
  dropSchema: true,
  entities: [OpportunityEntity],
  synchronize: true,
});

export const DbModule = dbInMemory ? InMemoryDbModule : CockroachDbModule;
