import type { QueryRunner } from "typeorm";
import UnrevertableMigration from "./UnrevertableMigration";

export class CreateMessageTables1673051031712 extends UnrevertableMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "messageThread" (
        "applicantInboxId"            char(21) NOT NULL,
        "applicantName"               text NOT NULL,
        "applicantEmail"              text NOT NULL,
        "applicantUserId"             text NOT NULL,
        "posterInboxId"               char(21) NOT NULL,
        "subject"                     text NOT NULL,
        "opportunityId"               char(21) NOT NULL,
        "createdAt"                   bigint NOT NULL,
        
        PRIMARY KEY ("applicantInboxId"),
        UNIQUE      ("posterInboxId"),
        UNIQUE      ("applicantUserId", "opportunityId"),

        CONSTRAINT "fk_opportunity"
          FOREIGN KEY ("opportunityId") 
	        REFERENCES "opportunity" ("opportunityId")
      );

      CREATE TABLE "message" (
        "messageId"                     char(21) NOT NULL,
        "recipientInboxId"              char(21) NOT NULL,
        "senderEmailAddress"            text NOT NULL,
        "sentAt"                        bigint NOT NULL,

        PRIMARY KEY ("messageId")
      );

      CREATE INDEX "idx_sentAt" ON "message" ("sentAt");
    `);
  }
}
