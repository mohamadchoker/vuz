import DB from '@/databases';
import { CarModelWithTags, CategoryWithCars } from '@/mappers/cars.mapper';
import { Op, Sequelize } from 'sequelize';

export class CarRepository {
  public async listCars(params: any, isPrivate: boolean): Promise<{ rows: CarModelWithTags[]; count: number }> {
    const { query, category, tags, lat, lng, limit, offset } = params;
    const where = {};

    if (lat && lng && isPrivate) {
      where[Op.and] = Sequelize.where(
        Sequelize.fn('ST_Distance', Sequelize.col('location'), Sequelize.fn('ST_PointFromText', `POINT(${lat} ${lng})`, 0)),
        '<',
        10000,
      );
    }
    if (query) {
      where[Op.or] = [
        { code: { [Op.like]: `%${query}%` } },
        { '$category.name$': { [Op.like]: `%${query}%` } },
        { '$tags.name$': { [Op.like]: `%${query}%` } },
      ];
    }
    if (category) {
      where['$category.name$'] = category;
    }
    if (tags) {
      where['$tags.name$'] = tags.split(',');
    }

    const cars = (await DB.Car.findAndCountAll({
      where,
      order: [['id', 'DESC']],
      include: [
        {
          model: DB.Tag,
          as: 'tags',
          attributes: ['name'],
        },
        {
          model: DB.Category,
          as: 'category',
          attributes: ['name'],
        },
      ],
      limit: limit,
      offset: offset,
      distinct: true,
      subQuery: false,
    })) as unknown as { rows: CarModelWithTags[]; count: number };

    return cars;
  }

  public async listCarsByCategory(): Promise<CategoryWithCars[]> {
    const cars = (await DB.Category.findAll({
      attributes: ['name', [Sequelize.literal('(SELECT COUNT(*) FROM cars where category_id = CategoryModel.id)'), 'total']],

      include: [
        {
          model: DB.Car,
          as: 'cars',
          attributes: ['id', 'code', 'image', 'location', 'createdAt', 'updatedAt'],
        },
      ],
      subQuery: false,
    })) as unknown as CategoryWithCars[];

    return cars;
  }
}
