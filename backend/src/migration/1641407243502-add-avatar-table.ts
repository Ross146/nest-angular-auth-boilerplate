import { MigrationInterface, QueryRunner } from 'typeorm';

export class addAvatarTable1641407243502 implements MigrationInterface {
  name = 'addAvatarTable1641407243502';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "avatar" ("id" SERIAL NOT NULL, "avatar" character varying NOT NULL, CONSTRAINT "PK_50e36da9d45349941038eaf149d" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "avatar"`);
  }
}
