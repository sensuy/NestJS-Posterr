import { MigrationInterface, QueryRunner } from "typeorm";

export class alterRepostCollumn1659443458763 implements MigrationInterface {
    name = 'alterRepostCollumn1659443458763'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repost" DROP CONSTRAINT "FK_9b1788c382faa92170b40d2e766"`);
        await queryRunner.query(`ALTER TABLE "repost" RENAME COLUMN "fk_posterid" TO "fk_postid"`);
        await queryRunner.query(`ALTER TABLE "repost" ADD CONSTRAINT "FK_7b24f9a717c1a7cb674d22ee837" FOREIGN KEY ("fk_postid") REFERENCES "post"("postid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repost" DROP CONSTRAINT "FK_7b24f9a717c1a7cb674d22ee837"`);
        await queryRunner.query(`ALTER TABLE "repost" RENAME COLUMN "fk_postid" TO "fk_posterid"`);
        await queryRunner.query(`ALTER TABLE "repost" ADD CONSTRAINT "FK_9b1788c382faa92170b40d2e766" FOREIGN KEY ("fk_posterid") REFERENCES "post"("postid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
