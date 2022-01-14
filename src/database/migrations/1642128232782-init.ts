import {MigrationInterface, QueryRunner} from "typeorm";

export class init1642128232782 implements MigrationInterface {
    name = 'init1642128232782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_bd5387c23fb40ae7e3526ad75ea"`);
        await queryRunner.query(`ALTER TABLE "tickets" RENAME COLUMN "event_id" TO "ticket_type_id"`);
        await queryRunner.query(`CREATE TABLE "ticket_type" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "event_id" integer, CONSTRAINT "PK_757d4830df239a662399edf9f24" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_a95369aeea12da7fde110e95e00" FOREIGN KEY ("ticket_type_id") REFERENCES "ticket_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "ticket_type" ADD CONSTRAINT "FK_0af363f9f7cc449c18178dfe0a2" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "ticket_type" DROP CONSTRAINT "FK_0af363f9f7cc449c18178dfe0a2"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_a95369aeea12da7fde110e95e00"`);
        await queryRunner.query(`DROP TABLE "ticket_type"`);
        await queryRunner.query(`ALTER TABLE "tickets" RENAME COLUMN "ticket_type_id" TO "event_id"`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_bd5387c23fb40ae7e3526ad75ea" FOREIGN KEY ("event_id") REFERENCES "events"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
