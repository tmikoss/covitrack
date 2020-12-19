import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis')

    await queryInterface.addColumn('areas', 'geography', { type: DataTypes.GEOGRAPHY })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('metrics', 'geography')
  },
}
