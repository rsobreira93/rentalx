import { getRepository, Repository } from "typeorm";

import { Specification } from "../../entities/Specification";
import {
  ICreateSpecificationsDTO,
  ISpecifiactionsRepository,
} from "../ISpecificationsRepository";

class SpecificationRepository implements ISpecifiactionsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification> {
    const specification = this.repository.create({ description, name });

    await this.repository.save(specification);

    return specification;
  }

  async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name });
    return specification;
  }
}

export { SpecificationRepository };
