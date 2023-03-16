import type { QueryRunner } from "typeorm";
import UnrevertableMigration from "./UnrevertableMigration";

export class IndoorsOrOutdoorsMultiChoice1678925103136 extends UnrevertableMigration {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "opportunity"
      ADD "isIndoors" boolean NOT NULL DEFAULT false,
      ADD "isOutdoors" boolean NOT NULL DEFAULT false,
      ADD "isOnline" boolean NOT NULL DEFAULT false;

      UPDATE "opportunity"
      SET "isIndoors" = ("indoorsOrOutdoors" = 'indoors'),
          "isOutdoors" = ("indoorsOrOutdoors" = 'outdoors');

      ALTER TABLE "opportunity"
      DROP COLUMN "indoorsOrOutdoors";
    `);
  }
}
