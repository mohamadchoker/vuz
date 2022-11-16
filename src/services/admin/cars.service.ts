import { CreateCarDto } from '@/dtos/cars.dto';
import { CarNotFoundError } from '@/errors';
import { CarModel, Location } from '@/models/car.model';
import DB from '@databases';

class CarService {
  public cars = DB.Car;

  public async create(carData: CreateCarDto): Promise<void> {
    const t = await DB.sequelize.transaction();
    try {
      const randomCode = Math.random().toString(36).substring(7);
      const location: Location = { type: 'Point', coordinates: [carData.longitude, carData.latitude] };

      const createCarData = await this.cars.create(
        {
          ...carData,
          code: randomCode,
          location,
        },
        { transaction: t },
      );

      await createCarData.setTags(carData.tags as any, { transaction: t });

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  public async update(carId: string, carData: CreateCarDto): Promise<CarModel> {
    const findCar: CarModel = await this.cars.findByPk(carId);
    if (!findCar) throw new CarNotFoundError();
    const t = await DB.sequelize.transaction();
    try {
      const location: Location = { type: 'Point', coordinates: [carData.longitude, carData.latitude] };

      await findCar.update(
        {
          ...carData,
          location,
        },
        { transaction: t },
      );

      await findCar.setTags(carData.tags as any, { transaction: t });
      await t.commit();
      return findCar;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  public async delete(carId: string): Promise<void> {
    const findCar: CarModel = await this.cars.findByPk(carId);
    if (!findCar) throw new CarNotFoundError();
    const t = await DB.sequelize.transaction();
    try {
      await findCar.destroy({ transaction: t });
      await findCar.removeTags();
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  public async findOne(carId: string): Promise<CarModel> {
    try {
      const car: CarModel = await this.cars.findByPk(carId);
      if (!car) throw new CarNotFoundError();
      return car;
    } catch (error) {
      throw error;
    }
  }
}

export default CarService;
