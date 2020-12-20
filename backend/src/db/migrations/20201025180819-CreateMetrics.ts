import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('metrics', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      areaId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      totalCases: DataTypes.BIGINT,
      newCases: DataTypes.BIGINT,
      totalTests: DataTypes.BIGINT,
      newTests: DataTypes.BIGINT,
      totalDeaths: DataTypes.BIGINT,
      newDeaths: DataTypes.BIGINT,
      totalVaccinations: DataTypes.BIGINT,
      newVaccinations: DataTypes.BIGINT,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    })

    await queryInterface.addConstraint('metrics', {
      type: 'foreign key',
      fields: ['areaId'],
      references: {
        table: 'areas',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })

    await queryInterface.addConstraint('metrics', {
      type: 'unique',
      fields: ['areaId', 'date'],
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('metrics')
  },
}
