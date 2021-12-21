import {MigrationInterface, QueryRunner} from "typeorm";

export class init1640056603107 implements MigrationInterface {
    name = 'init1640056603107'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" SERIAL NOT NULL, "first_name" character varying(255) NOT NULL, "last_name" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "rut" character varying(255) NOT NULL, "phone" character varying NOT NULL, "birthday" date NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_8536b8b85c06969f84f0c098b03" UNIQUE ("email"), CONSTRAINT "UQ_d237b8eb21f2d9220b570a2c910" UNIQUE ("rut"), CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying(255) NOT NULL, "password" character varying NOT NULL, "role" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tickets" ("id" SERIAL NOT NULL, "state" character varying NOT NULL, "pay_method" character varying NOT NULL, "sector" character varying NOT NULL, "date" date NOT NULL, "purchase_date" date NOT NULL, "price" integer NOT NULL, "quantity" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "customer_id" integer, "user_id" integer, CONSTRAINT "PK_343bc942ae261cf7a1377f48fd0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_42e4343476d9c4a46fb565a5c46" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tickets" ADD CONSTRAINT "FK_2e445270177206a97921e461710" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_2e445270177206a97921e461710"`);
        await queryRunner.query(`ALTER TABLE "tickets" DROP CONSTRAINT "FK_42e4343476d9c4a46fb565a5c46"`);
        await queryRunner.query(`DROP TABLE "tickets"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
