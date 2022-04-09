import { ICarRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarRepository
  ) {}

  async execute({ car_id, specifications_id }: IRequest) {
    const carExists = await this.carsRepository.findById(car_id);

    if (!carExists) {
      throw new AppError("Car does not exists");
    }
  }
}

export { CreateCarSpecificationUseCase };
