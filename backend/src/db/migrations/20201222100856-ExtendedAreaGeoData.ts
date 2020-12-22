import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('areas', 'bufferedOutline', { type: DataTypes.GEOMETRY })
    await queryInterface.addColumn('areas', 'containedPoints', { type: DataTypes.GEOMETRY })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('areas', 'bufferedOutline')
    await queryInterface.removeColumn('areas', 'containedPoints')
  },
}
