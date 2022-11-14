import { Location } from '@/models/car.model';

export interface Car {
  id: number;
  category_id: number;
  code: string;
  image: string;
  location: Location;
}

export interface CreateCarResponse {
  id: number;
  category: string;
  code: string;
  image: string;
  location: Partial<Location>;
}

export interface CarResponse {
  id: number;
  category: string;
  code: string;
  image: string;
  location: {
    lat: number;
    lng: number;
  };
  tags?: string[];
}

export interface ListCarsResponse {
  totalItems: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  data: CarResponse[];
}

export interface ListCarsByCategoryResponse {
  category: string;
  total: number;
  cars: Partial<CarResponse>[];
}
