import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659323122830 implements MigrationInterface {
    name = 'init1659323122830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "quotes" ("quoteid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fk_userid" character varying NOT NULL, "fk_posterid" uuid NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_iduser" uuid NOT NULL, CONSTRAINT "PK_c3c5e58a021c22307cc915b3779" PRIMARY KEY ("quoteid"))`);
        await queryRunner.query(`CREATE TABLE "repost" ("repostid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fk_userid" uuid NOT NULL, "fk_posterid" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c7fce2ee2de751ceacf3989dcf3" PRIMARY KEY ("repostid"))`);
        await queryRunner.query(`CREATE TABLE "post" ("postid" uuid NOT NULL DEFAULT uuid_generate_v4(), "fk_iduser" character varying NOT NULL, "content" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "fk_userid" uuid NOT NULL, CONSTRAINT "PK_87e77b553297ad798e5ce2203fc" PRIMARY KEY ("postid"))`);
        await queryRunner.query(`CREATE TABLE "user" ("userid" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_name" character varying(14) NOT NULL, "interactions" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_755ac9fbd440bc9b97fe9532108" PRIMARY KEY ("userid"))`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_f6a090afcc4294d1e68b4172cc2" FOREIGN KEY ("fk_iduser") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quotes" ADD CONSTRAINT "FK_2e311ad44b1c3c3a5eb5a922d00" FOREIGN KEY ("fk_posterid") REFERENCES "post"("postid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repost" ADD CONSTRAINT "FK_4c92756913ce84adc269d83dbbb" FOREIGN KEY ("fk_userid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repost" ADD CONSTRAINT "FK_9b1788c382faa92170b40d2e766" FOREIGN KEY ("fk_posterid") REFERENCES "post"("postid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_f6bcb65fb5a3e942ed67972770e" FOREIGN KEY ("fk_userid") REFERENCES "user"("userid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_f6bcb65fb5a3e942ed67972770e"`);
        await queryRunner.query(`ALTER TABLE "repost" DROP CONSTRAINT "FK_9b1788c382faa92170b40d2e766"`);
        await queryRunner.query(`ALTER TABLE "repost" DROP CONSTRAINT "FK_4c92756913ce84adc269d83dbbb"`);
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_2e311ad44b1c3c3a5eb5a922d00"`);
        await queryRunner.query(`ALTER TABLE "quotes" DROP CONSTRAINT "FK_f6a090afcc4294d1e68b4172cc2"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "repost"`);
        await queryRunner.query(`DROP TABLE "quotes"`);
    }

}
