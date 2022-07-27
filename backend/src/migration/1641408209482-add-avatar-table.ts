import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAvatarTable1641408209482 implements MigrationInterface {
  name = 'addAvatarTable1641408209482';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "public"."avatar" ADD "userId" uuid`);
    await queryRunner.query(
      `ALTER TABLE "public"."avatar" ADD CONSTRAINT "UQ_b6abb9e4579bb7fca4d823a5e66" UNIQUE ("userId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."avatar" ADD CONSTRAINT "FK_b6abb9e4579bb7fca4d823a5e66" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "public"."avatar" DROP CONSTRAINT "FK_b6abb9e4579bb7fca4d823a5e66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."avatar" DROP CONSTRAINT "UQ_b6abb9e4579bb7fca4d823a5e66"`,
    );
    await queryRunner.query(
      `ALTER TABLE "public"."avatar" DROP COLUMN "userId"`,
    );
  }
}
