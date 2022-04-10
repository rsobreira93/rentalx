import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { injectable, inject } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

interface IRquest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specifications: ISpecificationsRepository
  ) {}

  async execute({ description, name }: IRquest): Promise<Specification> {
    const specificationAlreadyExists = await this.specifications.findByName(
      name
    );

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists");
    }

    const specification = await this.specifications.create({
      description,
      name,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
