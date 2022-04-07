import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

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
      daily_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABC-1234",
      name: "Carro de teste",
    });
  });
});
