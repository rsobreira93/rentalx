import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    await createCarUseCase.execute({
      brand: "Brand",
      category_id: "catetgory",
      dayly_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Carro de teste",
    });
  });

  it("Should not be able to create a new car with the same license plate", async () => {
    await createCarUseCase.execute({
      brand: "Brand",
      category_id: "catetgory",
      dayly_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Carro de teste",
    });

    await expect(
      createCarUseCase.execute({
        brand: "Brand",
        category_id: "catetgory",
        dayly_rate: 100,
        description: "Carro de teste",
        fine_amount: 60,
        license_plate: "ABC-1234",
        name: "Carro de teste",
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with avaliable true by default", async () => {
    const car = await createCarUseCase.execute({
      brand: "Brand",
      category_id: "catetgory",
      dayly_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABCD-1234",
      name: "Car Available",
    });

    expect(car).toHaveProperty("id");
    expect(car.avaliable).toBe(true);
  });
});
