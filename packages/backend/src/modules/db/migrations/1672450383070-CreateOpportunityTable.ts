import assert from "assert";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOpportunityTable1672450383070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE opportunity (
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
          "postedTime"                  bigint,
          "postedByUserId"              text,
          
          PRIMARY KEY ("opportunityId")
      );

      CREATE INDEX idx_occursDate ON opportunity ("occursDate");
    `);
  }

  public async down(_: QueryRunner): Promise<void> {
    assert(false);
  }
}
