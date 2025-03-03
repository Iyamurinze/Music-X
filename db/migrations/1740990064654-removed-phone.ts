import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedPhone1740990064654 implements MigrationInterface {
    name = 'RemovedPhone1740990064654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "phone" SET DEFAULT 'N/A'`);
    }

}
