import { Category } from "../models/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  create({ description, name }: ICreateCategoryDTO): Category;
  findByName(name: string): Category | undefined;
  list(): Category[];
}

export { ICategoriesRepository, ICreateCategoryDTO };
