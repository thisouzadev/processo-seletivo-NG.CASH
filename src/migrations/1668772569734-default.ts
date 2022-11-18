import { MigrationInterface, QueryRunner } from "typeorm";

export class default1668772569734 implements MigrationInterface {
    name = 'default1668772569734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`transactions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`value\` int NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`debitedAccountId\` int NULL, \`creditedAccountId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`balance\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`accountId\` int NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), UNIQUE INDEX \`REL_42bba679e348de51a699fb0a80\` (\`accountId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_e48084dca44e4ce200cb6c295d8\` FOREIGN KEY (\`debitedAccountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`transactions\` ADD CONSTRAINT \`FK_90970e74d61cc1e18df1564e3be\` FOREIGN KEY (\`creditedAccountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_42bba679e348de51a699fb0a803\` FOREIGN KEY (\`accountId\`) REFERENCES \`accounts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_42bba679e348de51a699fb0a803\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_90970e74d61cc1e18df1564e3be\``);
        await queryRunner.query(`ALTER TABLE \`transactions\` DROP FOREIGN KEY \`FK_e48084dca44e4ce200cb6c295d8\``);
        await queryRunner.query(`DROP INDEX \`REL_42bba679e348de51a699fb0a80\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`accounts\``);
        await queryRunner.query(`DROP TABLE \`transactions\``);
    }

}
