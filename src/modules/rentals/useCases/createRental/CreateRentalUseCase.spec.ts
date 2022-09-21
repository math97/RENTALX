import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      car_id: "121212",
      expected_return_date: new Date(),
      user_id: "12345",
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      const rental = await createRentalUseCase.execute({
        car_id: "121212",
        expected_return_date: new Date(),
        user_id: "12345",
      });

      const rental2 = await createRentalUseCase.execute({
        car_id: "121213",
        expected_return_date: new Date(),
        user_id: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "121212",
        expected_return_date: new Date(),
        user_id: "12345",
      });

      await createRentalUseCase.execute({
        car_id: "121212",
        expected_return_date: new Date(),
        user_id: "123456",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        car_id: "121212",
        expected_return_date: dayjs().toDate(),
        user_id: "12345",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
