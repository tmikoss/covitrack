import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class MetricArea1603634179081 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn('metrics', new TableColumn({
      name: 'areaId',
      type: 'uuid'
    }))

    await queryRunner.createForeignKey('metrics', new TableForeignKey({
      columnNames: ['areaId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'areas'
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('metrics', 'areaId')
  }
}
