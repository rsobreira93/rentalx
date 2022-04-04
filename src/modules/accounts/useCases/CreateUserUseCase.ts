import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({
    email,
    name,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = await this.usersRepository.create({
      email,
      name,
      driver_license,
      password,
    });

    return user;
  }
}

export { CreateUserUseCase };
