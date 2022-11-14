import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '@interfaces/users.interface';

export type UserCreationAttributes = Optional<User, 'id' | 'active'>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public id: number;
  public name: string;
  public email: string;
  public password: string;
  public role: 'user' | 'admin';
  public active?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(255),
        unique: true,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING(255),
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('user', 'admin'),
      },
      active: {
        type: DataTypes.TINYINT,
        allowNull: true,
        defaultValue: 1,
      },
    },
    {
      tableName: 'users',
      sequelize,
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'email',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'email' }],
        },
        {
          name: 'role',
          using: 'BTREE',
          fields: [{ name: 'role' }],
        },
        {
          name: 'active',
          using: 'BTREE',
          fields: [{ name: 'active' }],
        },
      ],
    },
  );

  return UserModel;
}
