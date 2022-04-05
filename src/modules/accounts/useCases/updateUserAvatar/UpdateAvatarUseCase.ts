import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { deleFile } from "@utils/file";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await deleFile(`./tmp/avatar/${user.avatar}`);
    }
    user.avatar = avatar_file;

    await this.usersRepository.create(user);
  }
}

export { UpdateAvatarUseCase };
