import { Sequelize, DataTypes, Model } from 'sequelize';
import { CarTag } from '@interfaces/carTags.interface';

export type CarTagsCreationAttributes = CarTag;

export class CarTagsModel extends Model<CarTag, CarTagsCreationAttributes> implements CarTag {
  public car_id!: number;
  public tag_id!: number;
}

export default function (sequelize: Sequelize): typeof CarTagsModel {
  CarTagsModel.init(
    {
      car_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'cars',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      tag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'tags',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
    },
    {
      sequelize,
      tableName: 'car_tags',
      timestamps: false,
      indexes: [
        {
          name: 'fk_cartags_cars_car_id_idx',
          using: 'BTREE',
          fields: [{ name: 'car_id' }],
        },
        {
          name: 'fk_cartags_tags_tag_id_idx',
          using: 'BTREE',
          fields: [{ name: 'tag_id' }],
        },
      ],
    },
  );

  return CarTagsModel;
}
