import type { QueryRunner } from "typeorm";
import UnrevertableMigration from "./UnrevertableMigration";

export class CreateMessageTables1673051031712 extends UnrevertableMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`

      `);
  }
}
