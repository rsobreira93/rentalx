import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

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
    const emalAlreadyExists = await this.usersRepository.findByEmail(email);

    if (emalAlreadyExists) {
      throw new Error("Email already exists");
    }

    const passwordHased = await hash(password, 8);

    const user = await this.usersRepository.create({
      email,
      name,
      driver_license,
      password: passwordHased,
    });

    return user;
  }
}

export { CreateUserUseCase };
