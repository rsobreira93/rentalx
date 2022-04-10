import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";

import {
  ICreateSpecificationsDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepositoryInMemory implements ISpecificationsRepository {
  specifications: Specification[] = [];
  async create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, { description, name });

    this.specifications.push(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.specifications.find(
      (specification) => specification.name === name
    );

    return specification;
  }

  async findByIds(ids: string[]): Promise<Specification[]> {
    const specifications = this.specifications.filter((specification) =>
      ids.includes(specification.id)
    );

    return specifications;
  }
}

export { SpecificationRepositoryInMemory };
