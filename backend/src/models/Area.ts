import { Model, DataTypes, Optional, Sequelize } from 'sequelize'
import { database } from '../db'

type AreaKind = 'country' | 'zone'

type Geojson = object

interface AreaAttributes {
  id: string
  name: string
  code?: string
  kind: AreaKind
  population?: number
  continent?: string
  outline?: Geojson
  bufferedOutline?: Geojson
  containedPoints?: Geojson
}

interface AreaCreationAttributes extends Optional<AreaAttributes, 'id'> {}

class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  public id!: string
  public name!: string
  public kind!: AreaKind

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

Area.init(
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: Sequelize.literal('gen_random_uuid()'),
    },
    name: {
      unique: true,
      type: DataTypes.TEXT,
    },
    code: DataTypes.TEXT,
    kind: DataTypes.TEXT,
    population: DataTypes.BIGINT,
    continent: DataTypes.TEXT,
    outline: DataTypes.GEOMETRY,
    bufferedOutline: DataTypes.GEOMETRY,
    containedPoints: DataTypes.GEOMETRY,
  },
  {
    tableName: 'areas',
    sequelize: database,
    timestamps: true,
  }
)

export { Area }
