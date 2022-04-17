import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({
    car_id,
    expected_return_date,
    user_id,
    end_date,
    id,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      end_date,
      id,
      total,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const carUnavailable = this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );

    return carUnavailable;
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const userUnavailable = this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );

    return userUnavailable;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);

    return rental;
  }

  async findByUserId(user_id: string): Promise<Rental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);

    return rentals;
  }
}

export { RentalsRepositoryInMemory };
