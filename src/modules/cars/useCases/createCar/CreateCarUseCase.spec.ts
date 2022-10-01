import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      brand: "Brand Car",
      category_id: "Category",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be albe to create a car with exists license plate", async () => {
    await createCarUseCase.execute({
      name: "Car1",
      brand: "Brand Car",
      category_id: "Category",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABD-1234",
    });
    await expect(
      createCarUseCase.execute({
        name: "Car2",
        brand: "Brand Car",
        category_id: "Category",
        daily_rate: 100,
        description: "Description Car",
        fine_amount: 60,
        license_plate: "ABD-1234",
      })
    ).rejects.toEqual(new AppError("Car already exists!"));
  });

  it("Should be albe to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Name car",
      brand: "Brand Car",
      category_id: "Category",
      daily_rate: 100,
      description: "Description Car",
      fine_amount: 60,
      license_plate: "ABC-1234",
    });

    expect(car.available).toBe(true);
  });
});
