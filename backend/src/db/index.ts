import { Sequelize } from 'sequelize'

export const database = new Sequelize(process.env.DATABASE_URL!, {
  dialect: 'postgres',
})
