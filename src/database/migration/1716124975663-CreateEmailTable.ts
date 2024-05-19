import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateEmailTable1716124975663 implements MigrationInterface {
    name = 'CreateEmailTable1716124975663'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS "EMAIL" ("id" SERIAL NOT NULL, "email" character varying(256) NOT NULL, CONSTRAINT "PK_ab68e0cc21402c66dcbbaaaa882" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "EMAIL"`);
    }

}
