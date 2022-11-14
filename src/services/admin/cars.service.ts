import { CreateCarDto } from '@/dtos/cars.dto';
import { Location } from '@/models/car.model';
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
      console.log('error', error);
      await t.rollback();
      throw error;
    }
  }
}

export default CarService;
