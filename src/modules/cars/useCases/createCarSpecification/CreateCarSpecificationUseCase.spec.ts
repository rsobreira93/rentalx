import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carRepositoryInMemory: CarRepositoryInMemory;
let specificationsInMemory: SpecificationRepositoryInMemory;

describe("CreateCarSpecification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationsInMemory = new SpecificationRepositoryInMemory();

    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carRepositoryInMemory,
      specificationsInMemory
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

    const specification = await specificationsInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationCars).toHaveProperty("specifications");
    expect(specificationCars.specifications).toHaveLength(1);
    expect(specificationCars.specifications.length).toBe(1);
  });
});
