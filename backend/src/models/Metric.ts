import { Model, DataTypes, Optional, Sequelize } from 'sequelize'
import { database } from '../db'

interface MetricAttributes {
  id: string
  areaId: string
  date: Date
  totalCases?: number
  newCases?: number
  totalTests?: number
  newTests?: number
  totalDeaths?: number
  newDeaths?: number
  totalVaccinations?: number
  newVaccinations?: number
}

interface MetricCreationAttributes extends Optional<MetricAttributes, 'id'> {}

class Metric extends Model<MetricAttributes, MetricCreationAttributes> implements MetricAttributes {
  public id!: string
  public areaId!: string
  public date!: Date
  public totalCases?: number
  public newCases?: number
  public totalTests?: number
  public newTests?: number
  public totalDeaths?: number
  public newDeaths?: number
  public totalVaccinations?: number
  public newVaccinations?: number

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Metric.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    areaId: DataTypes.UUID,
    date: DataTypes.DATEONLY,
    totalCases: DataTypes.BIGINT,
    newCases: DataTypes.BIGINT,
    totalTests: DataTypes.BIGINT,
    newTests: DataTypes.BIGINT,
    totalDeaths: DataTypes.BIGINT,
    newDeaths: DataTypes.BIGINT,
    totalVaccinations: DataTypes.BIGINT,
    newVaccinations: DataTypes.BIGINT,
  },
  {
    tableName: 'metrics',
    sequelize: database,
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['areaId', 'date'],
      },
    ],
  }
)

export { Metric }
