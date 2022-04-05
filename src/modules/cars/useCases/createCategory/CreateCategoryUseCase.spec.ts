import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

let createCategoryUseCase: CreateCategoryUseCase;
let createCategoryRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {
  beforeEach(() => {
    createCategoryRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      createCategoryRepositoryInMemory
    );
  });

  it("Should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      description: "Category description",
      name: "Category name",
    });

    expect(category).toHaveProperty("id");
  });

  it("Should nont be able to create a new category with category exists", async () => {
    expect(async () => {
      await createCategoryUseCase.execute({
        description: "Category description",
        name: "Category name",
      });

      await createCategoryUseCase.execute({
        description: "Category description",
        name: "Category name",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
