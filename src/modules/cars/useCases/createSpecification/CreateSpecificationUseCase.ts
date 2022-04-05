import { AppError } from "@errors/AppError";
import { Specification } from "@modules/cars/entities/Specification";
import { ISpecifiactionsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { injectable, inject } from "tsyringe";

interface IRquest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specifications: ISpecifiactionsRepository
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
