import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });
  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1233",
      fine_amount: 40,
      brand: "Car brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1234",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car_brand_test",
    });

    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1235",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      name: "Car3",
    });

    expect(cars).toEqual([car]);
  });
  it("Should be able to list all available cars by category_id", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car description",
      daily_rate: 110.0,
      license_plate: "DEF-1236",
      fine_amount: 40,
      brand: "Car_brand_test",
      category_id: "category_id_test",
    });

    const cars = await listCarsUseCase.execute({
      category_id: "category_id_test",
    });

    expect(cars).toEqual([car]);
  });
});
