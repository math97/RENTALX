import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({
    car_id,
    expected_return_date,
    user_id,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expected_return_date,
      user_id,
    });

    this.repository.save(rental);

    return rental;
  }
  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = this.repository.findOne({ user_id });
    return openByUser;
  }
  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = this.repository.findOne({ car_id });
    return openByCar;
  }
}

export { RentalsRepository };
