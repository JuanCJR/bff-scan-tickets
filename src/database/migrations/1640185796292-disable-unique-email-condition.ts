import {MigrationInterface, QueryRunner} from "typeorm";

export class disableUniqueEmailCondition1640185796292 implements MigrationInterface {
    name = 'disableUniqueEmailCondition1640185796292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" DROP CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "customers" ADD CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email")`);
    }

}
