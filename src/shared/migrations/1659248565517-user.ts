import { MigrationInterface, QueryRunner } from "typeorm";

export class user1659248565517 implements MigrationInterface {
    name = 'user1659248565517'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "idpost" TO "postid"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME CONSTRAINT "PK_ae32f9fdf2a56d6af4f4e467b3f" TO "PK_87e77b553297ad798e5ce2203fc"`);
        await queryRunner.query(`CREATE TABLE "user" ("userid" uuid NOT NULL DEFAULT uuid_generate_v4(), "interactions" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_755ac9fbd440bc9b97fe9532108" PRIMARY KEY ("userid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME CONSTRAINT "PK_87e77b553297ad798e5ce2203fc" TO "PK_ae32f9fdf2a56d6af4f4e467b3f"`);
        await queryRunner.query(`ALTER TABLE "post" RENAME COLUMN "postid" TO "idpost"`);
    }

}
