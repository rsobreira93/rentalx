import { Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ description, name }: ICreateCategoryDTO): Promise<Category>;
  findByName(name: string): Promise<Category> | undefined;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, ICreateCategoryDTO };
