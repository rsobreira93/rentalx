import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";

import { Car } from "../entities/Car";

class CarsRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    brand,
    category_id,
    dayly_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      dayly_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({ license_plate: licensePlate });

    return car;
  }

  async findAvailable(
    brand?: string,
    name?: string,
    category_id?: string
  ): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("c")
      .where("avaliable = :avaliable", { avaliable: true });

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand });
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name });
    }

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.repository.findOne(car_id);

    return car;
  }
}

export { CarsRepository };
