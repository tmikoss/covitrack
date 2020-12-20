import { QueryInterface, DataTypes } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.addColumn('metrics', 'newCasesPerMillionSmoothed', { type: DataTypes.FLOAT })
    await queryInterface.addColumn('metrics', 'newDeathsPerMillionSmoothed', { type: DataTypes.FLOAT })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.removeColumn('metrics', 'newCasesPerMillionSmoothed')
    await queryInterface.removeColumn('metrics', 'newDeathsPerMillionSmoothed')
  },
}
