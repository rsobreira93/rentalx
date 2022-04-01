import { Specification } from "../../models/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecifiactionsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecifiactionsRepository {
  specification: Specification[];

  constructor() {
    this.specification = [];
  }

  create({ description, name }: ICreateSpecificationsDTO): Specification {
    const specification = new Specification();

    Object.assign(specification, { name, description, created_at: new Date() });

    this.specification.push(specification);

    return specification;
  }

  findByName(name: string): Specification {
    const specification = this.specification.find(
      (specification) => specification.name === name
    );

    return specification;
  }
}

export { SpecificationRepository };
