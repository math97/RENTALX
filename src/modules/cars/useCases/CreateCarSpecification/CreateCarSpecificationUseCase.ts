import { CarsRepository } from "@modules/cars/infra/typeorm/repositories/CarsRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specification_id: string[];
}

class CreateCarSpecificationUseCase {
  constructor(private carsRepository: ICarsRepository) {}
  async execute({ car_id, specification_id }: IRequest): Promise<void> {
    const car = this.carsRepository.findById(car_id);

    if (!car) throw new AppError("Car doesn't exists!");
  }
}

export { CreateCarSpecificationUseCase };
