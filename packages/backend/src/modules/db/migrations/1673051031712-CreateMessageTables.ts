import type { QueryRunner } from "typeorm";
import UnrevertableMigration from "./UnrevertableMigration";

export class CreateMessageTables1673051031712 extends UnrevertableMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE messageThread (
          "opportunityId"               char(21) NOT NULL,
          "title"                       text NOT NULL,
          "contactName"                 text NOT NULL,
          "requiredPeopleCount"         int NOT NULL,
          "occursDate"                  text NOT NULL,
          "occursTime"                  text,
          "description"                 text NOT NULL,
          "locationName"                text NOT NULL,
          "indoorsOrOutdoors"           text NOT NULL,
          "contactEmail"                text,
          "contactPhone"                text,
          "criminalRecordCheckRequired" boolean NOT NULL,
          "idealVolunteer"              text,
          "additionalInformation"       text,
          "postedTime"                  bigint NOT NULL,
          "postedByUserId"              text,
          
          PRIMARY KEY ("opportunityId")
      );
    `);
  }
}
