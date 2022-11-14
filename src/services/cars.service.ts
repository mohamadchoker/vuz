import { SearchCarsDto } from '@/dtos/searchCars.dto';
import { ListCarsByCategoryResponse, ListCarsResponse } from '@/interfaces/car.interface';
import CarsMapper from '@/mappers/cars.mapper';

import { getPagination, getPagingData } from '@/utils/paginator';
import { CarRepository } from '@/repositories/cars.repository';

class CarService {
  constructor(private carsRepository: CarRepository) {}

  public async listCars(params: SearchCarsDto, isPrivate: boolean): Promise<ListCarsResponse> {
    const { page, size } = params;

    const { limit, offset } = getPagination(page || 1, size || 10);

    params.page = limit;
    params.size = offset;
    const cars = await this.carsRepository.listCars(params, isPrivate);
    const carsResponse = CarsMapper.listCars(cars.rows);

    return getPagingData(carsResponse, cars.count, page, limit);
  }

  public async listCarsByCategory(): Promise<ListCarsByCategoryResponse[]> {
    const cars = await this.carsRepository.listCarsByCategory();
    return CarsMapper.listCarsByCategory(cars);
  }
}

export default CarService;
