import { MigrationInterface, QueryRunner } from 'typeorm';

export class userRemoveDescription1640951515730 implements MigrationInterface {
  name = 'userRemoveDescription1640951515730';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" DROP COLUMN "description"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."user" ADD "description" text`,
    );
  }
}
