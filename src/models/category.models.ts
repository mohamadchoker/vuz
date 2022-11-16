import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { Category } from '@interfaces/category.interface';
import { CarModel } from './car.model';

export type CategoryCreationAttributes = Optional<Category, 'id'>;
export type CarId = CarModel['category_id'];

export class CategoryModel extends Model<Category, CategoryCreationAttributes> implements Category {
  public id: number;
  public name: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  countCars!: Sequelize.HasManyCountAssociationsMixin;
}

export default function (sequelize: Sequelize.Sequelize): typeof CategoryModel {
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
