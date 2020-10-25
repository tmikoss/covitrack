import { Model, DataTypes, Optional, Sequelize } from 'sequelize'
import { database } from '../db'
import { Area } from './Area'

interface MetricAttributes {
  id: string
  areaId: string
  date: Date
  activeCases?: number
  totalCases?: number
  totalDeaths?: number
  totalRecovered?: number
}

interface MetricCreationAttributes extends Optional<MetricAttributes, "id"> { }

class Metric extends Model<MetricAttributes, MetricCreationAttributes> implements MetricAttributes {
  public id!: string
  public areaId!: string
  public date!: Date
  public activeCases?: number
  public totalCases?: number
  public totalDeaths?: number
  public totalRecovered?: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Metric.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    areaId: DataTypes.UUID,
    date: DataTypes.DATEONLY,
    activeCases: DataTypes.INTEGER,
    totalCases: DataTypes.INTEGER,
    totalDeaths: DataTypes.INTEGER,
    totalRecovered: DataTypes.INTEGER,
  },
  {
    tableName: "metrics",
    sequelize: database,
    timestamps: true,
    indexes: [{
      unique: true,
      fields: ['areaId', 'date']
    }]
  }
)

export { Metric }
