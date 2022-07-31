import { MigrationInterface, QueryRunner } from "typeorm";

export class post1659158236536 implements MigrationInterface {
    name = 'post1659158236536'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "post" ("idpost" uuid NOT NULL DEFAULT uuid_generate_v4(), "fk_iduser" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ae32f9fdf2a56d6af4f4e467b3f" PRIMARY KEY ("idpost"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "post"`);
    }

}
