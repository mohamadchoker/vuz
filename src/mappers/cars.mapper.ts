import { Car, CarResponse, ListCarsByCategoryResponse } from '@/interfaces/car.interface';
import { Category } from '@/interfaces/category.interface';
import { CarModel } from '@/models/car.model';
import { TagModel } from '@/models/tag.model';

export type CarModelWithTags = CarModel & { tags: TagModel[] } & { category: Category };

export type CategoryWithCars = { name: string; dataValues: { total: number }; cars: CarModelWithTags[] };

export default class CarsMapper {
  public static listCars(cars: CarModelWithTags[]): CarResponse[] {
    return cars.map(car => {
      return {
        id: car.id,
        category: car.category?.name,
        code: car.code,
        image: car.image,
        location: {
          lat: car.location.coordinates[0],
          lng: car.location.coordinates[1],
        },
        ...(car.tags?.length > 0 && { tags: car.tags.map(tag => tag.name) }),
      };
    });
  }

  public static listCarsByCategory(categories: CategoryWithCars[]): ListCarsByCategoryResponse[] {
    return categories.map(category => {
      return {
        category: category.name,
        total: category.dataValues.total,
        cars: category.cars.map((car: Car) => {
          return {
            id: car.id,
            code: car.code,
            image: car.image,
            location: {
              lat: car.location.coordinates[0],
              lng: car.location.coordinates[1],
            },
          };
        }),
      };
    });
  }
}
