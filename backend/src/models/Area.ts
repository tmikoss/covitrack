import { Model, DataTypes, Optional, Sequelize } from 'sequelize'
import { database } from '../db'

interface AreaAttributes {
  id: string;
  name: string;
}

interface AreaCreationAttributes extends Optional<AreaAttributes, "id"> { }

class Area extends Model<AreaAttributes, AreaCreationAttributes> implements AreaAttributes {
  public id!: string;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Area.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true
    }
  },
  {
    tableName: "areas",
    sequelize: database,
    timestamps: true
  }
)

export { Area }
