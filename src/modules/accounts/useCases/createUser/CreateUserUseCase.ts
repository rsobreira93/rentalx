import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/entities/User";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

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
      throw new AppError("Email already exists");
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
