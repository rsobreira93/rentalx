import { ICreateCarDTO } from "../dtos/ICreateCarDTO";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<Car>;
}

export { ICarRepository };
