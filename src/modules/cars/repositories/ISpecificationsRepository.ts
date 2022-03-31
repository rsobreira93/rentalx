import { Specification } from "../models/Specification";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecifiactionsRepository {
  create({ description, name }: ICreateSpecificationsDTO): Specification;
  findByName(name: string): Specification | undefined;
}

export { ISpecifiactionsRepository, ICreateSpecificationsDTO };
