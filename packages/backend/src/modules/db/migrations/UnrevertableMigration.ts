import type { MigrationInterface, QueryRunner } from "typeorm";

export default abstract class UnrevertableMigration
  implements MigrationInterface
{
  abstract up(queryRunner: QueryRunner): Promise<any>;

  down(_: QueryRunner): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
