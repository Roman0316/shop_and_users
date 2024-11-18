import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1727277090653 implements MigrationInterface {
  name = 'CreateUser1727277090653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."user_gender_enum" AS ENUM('0', '1', '2')`,
    );
    await queryRunner.query(`CREATE TABLE "user"
                                 (
                                     "id"        SERIAL                      NOT NULL,
                                     "firstName" character varying(50)       NOT NULL,
                                     "lastName"  character varying(50)       NOT NULL,
                                     "age"       smallint                    NOT NULL,
                                     "gender"    "public"."user_gender_enum" NOT NULL DEFAULT '2',
                                     "issues"    boolean                     NOT NULL,
                                     CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
                                 )`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
  }
}
