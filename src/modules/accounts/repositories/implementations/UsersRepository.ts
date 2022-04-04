import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    driver_license,
    email,
    name,
    password,
    username,
  }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({
      email,
      name,
      username,
      driver_license,
      password,
    });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
