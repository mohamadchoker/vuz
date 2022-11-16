import Sequelize, { DataTypes, Model, Optional } from 'sequelize';
import { Car } from '@interfaces/car.interface';
import { CarTag } from '@/interfaces/carTags.interface';

export type CarCreationAttributes = Optional<Car, 'id'>;

export type Location = {
  type: string;
  coordinates: number[];
};

export class CarModel extends Model<Car, CarCreationAttributes> implements Car {
  public id: number;
  public category_id: number;
  public code: string;
  public image: string;
  public location: any;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  setTags!: Sequelize.HasManySetAssociationsMixin<CarTag, 'id'>;
  getTags!: Sequelize.HasManyGetAssociationsMixin<CarTag>;
  removeTags!: Sequelize.HasManyRemoveAssociationsMixin<CarTag, 'id'>;
}

export default function (sequelize: Sequelize.Sequelize): typeof CarModel {
  CarModel.init(
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'car_categories',
          key: 'id',
        },
      },
      code: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: 'code_UNIQUE',
      },
      image: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      location: {
        type: DataTypes.GEOMETRY('POINT', 4326),
        allowNull: false,
      },
    },
    {
      sequelize,
      // paranoid: true,
      // deletedAt: 'deleted_at',
      tableName: 'cars',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'code_UNIQUE',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'code' }],
        },
        {
          name: 'location',
          type: 'SPATIAL',
          fields: [{ name: 'location' }],
        },
        {
          name: 'fk_cars_car_categories_category_id_idx',
          using: 'BTREE',
          fields: [{ name: 'category_id' }],
        },
      ],
    },
  );

  return CarModel;
}
