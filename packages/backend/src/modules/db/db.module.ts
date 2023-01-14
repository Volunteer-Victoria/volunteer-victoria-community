import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { isRunningLocally } from "../../util";
import { MessageEntity } from "../message/message.entity";
import { MessageThreadEntity } from "../message/thread.entity";
import { OpportunityEntity } from "../opportunity/opportunity.entity";
import { CreateOpportunityTable1672450383070 } from "./migrations/1672450383070-CreateOpportunityTable";
import { CreateMessageTables1673051031712 } from "./migrations/1673051031712-CreateMessageTables";

const dbInMemory = process.env["DB_INMEMORY"] !== undefined;

const entities = [OpportunityEntity, MessageEntity, MessageThreadEntity];

const migrations = [
  CreateOpportunityTable1672450383070,
  CreateMessageTables1673051031712,
];

export const CockroachDbModule = TypeOrmModule.forRootAsync({
  useFactory: () =>
    ({
      type: "cockroachdb",
      entities,
      migrations,
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
  entities,
  synchronize: true,
});

export const DbModule = dbInMemory ? InMemoryDbModule : CockroachDbModule;
