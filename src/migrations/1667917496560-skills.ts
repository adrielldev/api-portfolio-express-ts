import { MigrationInterface, QueryRunner } from "typeorm";

export class skills1667917496560 implements MigrationInterface {
    name = 'skills1667917496560'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "project_skills_skill" ("projectId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_75331efa833de97a3674c5152e8" PRIMARY KEY ("projectId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d3434af0018f24c564c2ab1fbf" ON "project_skills_skill" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8650b9852e80554b1f0d493ac5" ON "project_skills_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "project_skills_skill" ADD CONSTRAINT "FK_d3434af0018f24c564c2ab1fbfe" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_skills_skill" ADD CONSTRAINT "FK_8650b9852e80554b1f0d493ac59" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_skills_skill" DROP CONSTRAINT "FK_8650b9852e80554b1f0d493ac59"`);
        await queryRunner.query(`ALTER TABLE "project_skills_skill" DROP CONSTRAINT "FK_d3434af0018f24c564c2ab1fbfe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8650b9852e80554b1f0d493ac5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d3434af0018f24c564c2ab1fbf"`);
        await queryRunner.query(`DROP TABLE "project_skills_skill"`);
    }

}
