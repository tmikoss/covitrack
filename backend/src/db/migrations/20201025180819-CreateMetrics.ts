import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('metrics', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      areaId: {
        type: DataTypes.UUID,
        allowNull: false
      },
      date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      activeCases: DataTypes.INTEGER,
      totalCases: DataTypes.INTEGER,
      totalDeaths: DataTypes.INTEGER,
      totalRecovered: DataTypes.INTEGER,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE
    })

    await queryInterface.addConstraint('metrics', {
      type: 'foreign key',
      fields: ['areaId'],
      references: {
        table: 'areas',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })

    await queryInterface.addConstraint('metrics', {
      type: 'unique',
      fields: ['areaId', 'date']
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('metrics')
  }
};
