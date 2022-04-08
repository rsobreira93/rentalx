import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { ICarRepository } from "../ICarsRepository";

class CarRepositoryInMemory implements ICarRepository {
  cars: Car[] = [];

  async create({
    brand,
    category_id,
    dayly_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      brand,
      category_id,
      dayly_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);

    return car;
  }
}

export { CarRepositoryInMemory };
