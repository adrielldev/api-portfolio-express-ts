import { MigrationInterface, QueryRunner } from "typeorm";

export class createTables1667490758509 implements MigrationInterface {
    name = 'createTables1667490758509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "skill" ("id" uuid NOT NULL, "name" character varying NOT NULL, "type" character varying NOT NULL, "url_image" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_a0d33334424e64fb78dc3ce7196" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "stack" character varying NOT NULL, "url_image" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_4d68b1358bb5b766d3e78f32f57" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "project_projects_skill" ("projectId" uuid NOT NULL, "skillId" uuid NOT NULL, CONSTRAINT "PK_f96ca8a2eba72f4a0bd609381ce" PRIMARY KEY ("projectId", "skillId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_42ff2dee5485fb115686b1139f" ON "project_projects_skill" ("projectId") `);
        await queryRunner.query(`CREATE INDEX "IDX_91e73f702cf07aa1751cf26e06" ON "project_projects_skill" ("skillId") `);
        await queryRunner.query(`ALTER TABLE "skill" ADD CONSTRAINT "FK_c08612011a88745a32784544b28" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project" ADD CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "project_projects_skill" ADD CONSTRAINT "FK_42ff2dee5485fb115686b1139f5" FOREIGN KEY ("projectId") REFERENCES "project"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "project_projects_skill" ADD CONSTRAINT "FK_91e73f702cf07aa1751cf26e06e" FOREIGN KEY ("skillId") REFERENCES "skill"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "project_projects_skill" DROP CONSTRAINT "FK_91e73f702cf07aa1751cf26e06e"`);
        await queryRunner.query(`ALTER TABLE "project_projects_skill" DROP CONSTRAINT "FK_42ff2dee5485fb115686b1139f5"`);
        await queryRunner.query(`ALTER TABLE "project" DROP CONSTRAINT "FK_7c4b0d3b77eaf26f8b4da879e63"`);
        await queryRunner.query(`ALTER TABLE "skill" DROP CONSTRAINT "FK_c08612011a88745a32784544b28"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_91e73f702cf07aa1751cf26e06"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_42ff2dee5485fb115686b1139f"`);
        await queryRunner.query(`DROP TABLE "project_projects_skill"`);
        await queryRunner.query(`DROP TABLE "project"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "skill"`);
    }

}
