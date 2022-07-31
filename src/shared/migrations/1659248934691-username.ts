import { MigrationInterface, QueryRunner } from "typeorm";

export class username1659248934691 implements MigrationInterface {
    name = 'username1659248934691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "user_name" character varying(14) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "user_name"`);
    }

}
