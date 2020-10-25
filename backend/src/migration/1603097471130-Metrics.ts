import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Metrics1603097471130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'metrics',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true
        },
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('metrics')
  }
}
