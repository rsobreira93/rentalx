import { injectable, inject } from "tsyringe";

import { Specification } from "../../entities/Specification";
import { ISpecifiactionsRepository } from "../../repositories/ISpecificationsRepository";

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
      throw new Error("Specification already exists");
    }

    const specification = await this.specifications.create({
      description,
      name,
    });

    return specification;
  }
}

export { CreateSpecificationUseCase };
