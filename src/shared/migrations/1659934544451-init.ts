import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659934544451 implements MigrationInterface {
    name = 'init1659934544451'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("userid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(14) NOT NULL, "interactions" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_755ac9fbd440bc9b97fe9532108" PRIMARY KEY ("userid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d34106f8ec1ebaf66f4f8609dd" ON "user" ("user_name") `);
        await queryRunner.query(`CREATE TABLE "post" ("postid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fk_userid" uuid NOT NULL, "content" character varying(777) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_87e77b553297ad798e5ce2203fc" PRIMARY KEY ("postid"))`);
        await queryRunner.query(`CREATE TABLE "repost" ("repostid" uuid NOT NULL, "postid" uuid NOT NULL, CONSTRAINT "PK_8f77f44ead141ab553ee77ffcfe" PRIMARY KEY ("repostid", "postid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c7fce2ee2de751ceacf3989dcf" ON "repost" ("repostid") `);
        await queryRunner.query(`CREATE INDEX "IDX_1b0aa0ad4888b97ab268028de8" ON "repost" ("postid") `);
        await queryRunner.query(`CREATE TABLE "quote" ("quoteid" uuid NOT NULL, "postid" uuid NOT NULL, CONSTRAINT "PK_7014c32d5325ec9eb79027c4369" PRIMARY KEY ("quoteid", "postid"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c5be84a226c89d1c4763f0266d" ON "quote" ("quoteid") `);
        await queryRunner.query(`CREATE INDEX "IDX_1ea16c5d11d17a5f73a9cb282d" ON "quote" ("postid") `);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_f6bcb65fb5a3e942ed67972770e" FOREIGN KEY ("fk_userid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repost" ADD CONSTRAINT "FK_c7fce2ee2de751ceacf3989dcf3" FOREIGN KEY ("repostid") REFERENCES "post"("postid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "repost" ADD CONSTRAINT "FK_1b0aa0ad4888b97ab268028de8c" FOREIGN KEY ("postid") REFERENCES "post"("postid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_c5be84a226c89d1c4763f0266d6" FOREIGN KEY ("quoteid") REFERENCES "post"("postid") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_1ea16c5d11d17a5f73a9cb282d5" FOREIGN KEY ("postid") REFERENCES "post"("postid") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_1ea16c5d11d17a5f73a9cb282d5"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_c5be84a226c89d1c4763f0266d6"`);
        await queryRunner.query(`ALTER TABLE "repost" DROP CONSTRAINT "FK_1b0aa0ad4888b97ab268028de8c"`);
        await queryRunner.query(`ALTER TABLE "repost" DROP CONSTRAINT "FK_c7fce2ee2de751ceacf3989dcf3"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_f6bcb65fb5a3e942ed67972770e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1ea16c5d11d17a5f73a9cb282d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c5be84a226c89d1c4763f0266d"`);
        await queryRunner.query(`DROP TABLE "quote"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1b0aa0ad4888b97ab268028de8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c7fce2ee2de751ceacf3989dcf"`);
        await queryRunner.query(`DROP TABLE "repost"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d34106f8ec1ebaf66f4f8609dd"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
