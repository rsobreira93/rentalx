import { Specification } from "../infra/typeorm/entities/Specification";

interface ICreateSpecificationsDTO {
  name: string;
  description: string;
}

interface ISpecifiactionsRepository {
  create({
    description,
    name,
  }: ICreateSpecificationsDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification> | undefined;
}

export { ISpecifiactionsRepository, ICreateSpecificationsDTO };
