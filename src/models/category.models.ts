import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Category } from '@interfaces/category.interface';

export type CategoryCreationAttributes = Optional<Category, 'id'>;

export class CategoryModel extends Model<Category, CategoryCreationAttributes> implements Category {
  public id: number;
  public name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof CategoryModel {
  CategoryModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'car_categories',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
      ],
    },
  );
  return CategoryModel;
}
