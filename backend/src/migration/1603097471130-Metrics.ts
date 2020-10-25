import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Metrics1603097471130 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'metrics',
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          generationStrategy: 'uuid',
          default: 'uuid_generate_v4()',
        },
        {
          name: 'activeCases',
          type: 'int',
        },
        {
          name: 'totalCases',
          type: 'int'
        },
        {
          name: 'totalDeaths',
          type: 'int'
        },
        {
          name: 'totalRecovered',
          type: 'int'
        },
        {
          name: 'date',
          type: 'date'
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('metrics')
  }
}
