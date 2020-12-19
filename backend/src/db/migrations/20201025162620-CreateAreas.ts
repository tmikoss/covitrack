import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS pgcrypto')

    await queryInterface.createTable('areas', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT,
      },
      code: DataTypes.TEXT,
      kind: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      population: DataTypes.BIGINT,
      continent: DataTypes.TEXT,
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE,
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('areas')
  },
}
