import Sequelize from 'sequelize';
import { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } from '@config';
import UserModel from '@/models/users.model';
import CarModel from '@/models/car.model';
import CategoryModel from '@/models/category.models';
import TagModel from '@/models/tag.model';
import CarTagsModel from '@/models/carTags.models';

const sequelize = new Sequelize.Sequelize(DB_DATABASE, DB_USER, DB_PASSWORD, {
  dialect: 'mysql',
  host: DB_HOST,
  port: Number(DB_PORT),
  define: {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci',
    underscored: true,
    freezeTableName: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
});

sequelize.authenticate();

const DB = {
  User: UserModel(sequelize),
  Tag: TagModel(sequelize),
  Car: CarModel(sequelize),
  Category: CategoryModel(sequelize),
  CarTags: CarTagsModel(sequelize),
  sequelize,
  Sequelize,
};

// Associations

DB.Car.belongsTo(DB.Category, { foreignKey: 'category_id', as: 'category' });
DB.Car.belongsToMany(DB.Tag, { through: 'car_tags', foreignKey: 'car_id', as: 'tags' });

DB.CarTags.belongsTo(DB.Car, { as: 'car', foreignKey: 'car_id' });
DB.CarTags.belongsTo(DB.Tag, { as: 'tag', foreignKey: 'tag_id' });

DB.Category.hasMany(DB.Car, { as: 'cars', foreignKey: 'category_id' });
DB.Tag.belongsToMany(DB.Car, { as: 'cars', through: 'car_tags', foreignKey: 'tag_id' });

export default DB;
