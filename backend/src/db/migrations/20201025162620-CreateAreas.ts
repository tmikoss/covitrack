import { QueryInterface, DataTypes, Sequelize } from 'sequelize'

module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('areas', {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.TEXT
      },
      updatedAt: DataTypes.DATE,
      createdAt: DataTypes.DATE
    })
  },

  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('areas')
  }
};
