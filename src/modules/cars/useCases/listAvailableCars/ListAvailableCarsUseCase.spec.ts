import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: CarRepositoryInMemory;

describe("ListCars", () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
  });

  it("should be able to list all available cats", async () => {
    const car = await carsRepository.create({
      name: "Car 1",
      brand: "Brand 1",
      dayly_rate: 100.0,
      description: "Description 1",
      license_plate: "ABC-1234",
      fine_amount: 0,
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list al  available cars by brand", async () => {
    const car = await carsRepository.create({
      name: "Car 2",
      brand: "Car_brand_test",
      dayly_rate: 100.0,
      description: "Description 1",
      license_plate: "ABC-1234",
      fine_amount: 0,
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list al  available cars by name", async () => {
    const car = await carsRepository.create({
      name: "Car 3",
      brand: "Car_brand_test",
      dayly_rate: 100.0,
      description: "Description 1",
      license_plate: "ABC-1234",
      fine_amount: 0,
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car 3",
    });

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });

  it("should be able to list al  available cars by category_id", async () => {
    const car = await carsRepository.create({
      name: "Car 4",
      brand: "Car_brand_test",
      dayly_rate: 100.0,
      description: "Description 1",
      license_plate: "ABC-1234",
      fine_amount: 0,
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category_id",
    });

    expect(cars).toHaveLength(1);
    expect(cars).toEqual([car]);
  });
});
