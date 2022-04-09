import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("CreateCarSpecification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a non-existing-car-id", async () => {
    expect(async () => {
      const car_id = "non-existing-car-id";
      const specifications_id = ["4", "4", "4"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carRepositoryInMemory.create({
      brand: "Brand",
      description: "Description",
      name: "Name",
      license_plate: "License Plate",
      fine_amount: 0,
      dayly_rate: 0,
      category_id: "category-id",
    });

    const specifications_id = ["4", "4", "4"];

    await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });
  });
});
