import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis')

    await queryInterface.addColumn('areas', 'outline', { type: DataTypes.GEOMETRY })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('areas', 'outline')
  },
}
