import { Specification } from "../../models/Specification";
import { ISpecifiactionsRepository } from "../../repositories/ISpecificationsRepository";

interface IRquest {
  name: string;
  description: string;
}

class CreateSpecificationUseCase {
  constructor(private specification: ISpecifiactionsRepository) {}

  execute({ description, name }: IRquest): Specification {
    const specificationAlreadyExists = this.specification.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists");
    }

    const specification = this.specification.create({ description, name });

    return specification;
  }
}

export { CreateSpecificationUseCase };
