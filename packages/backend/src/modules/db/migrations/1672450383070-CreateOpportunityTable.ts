import assert from "assert";
import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOpportunityTable1672450383070 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE opportunity (
                opportunityId char(21) NOT NULL,
                title text NOT NULL,
                contactName text NOT NULL,
                requiredPeopleCount int NOT NULL,
                occursDate char(10) NOT NULL,
                occursTime text,
                description text NOT NULL,
                locationName text NOT NULL,
                indoorsOrOutdoors varchar(8) NOT NULL,
                contactEmail text,
                contactPhone text,
                criminalRecordCheckRequired boolean NOT NULL,
                idealVolunteer text,
                additionalInformation text,
                postedTime bigint,
                postedByUserId char(21)
                
                CONSTRAINT opportunityId_pk PRIMARY KEY (opportunityId)
            );

            
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    assert(false);
  }
}
