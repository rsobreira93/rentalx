import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import dayjs from "dayjs";

import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { RentalsRepositoryInMemory } from "../../repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let createCarRepositoryInMemory: CarRepositoryInMemory;

describe("CreateRentalUseCase", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createCarRepositoryInMemory = new CarRepositoryInMemory();

    createRentalUseCase = new CreateRentalUseCase(
      dayjsDateProvider,
      rentalsRepositoryInMemory,
      createCarRepositoryInMemory
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await createCarRepositoryInMemory.create({
      brand: "Brand",
      category_id: "catetgory",
      dayly_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABCD-1234",
      name: "Car Available",
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "user-id",
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    const car = await createCarRepositoryInMemory.create({
      brand: "Brand",
      category_id: "catetgory",
      dayly_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABCD-1234",
      name: "Car Available",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "user-id",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: "car-id1",
        user_id: "user-id",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("User already has an open rental"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    const car = await createCarRepositoryInMemory.create({
      brand: "Brand",
      category_id: "catetgory",
      dayly_rate: 100,
      description: "Carro de teste",
      fine_amount: 60,
      license_plate: "ABCD-1234",
      name: "Car Available",
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: "user-id",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: "user-id1",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is already rented"));
  });

  it("should not be able to create a new rental if expected return time less 24 hours", async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: "car-id",
        user_id: "user-id1",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(
      new AppError("Expected return date must be at least 24 hours")
    );
  });
});
