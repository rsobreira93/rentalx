import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}
  async execute({ avatar_file, user_id }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(user_id);

    console.log(user.avatar);
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar, "avatar");
    }

    user.avatar = avatar_file;
    await this.storageProvider.saveFile(user.avatar, "avatar");

    await this.usersRepository.create(user);
  }
}

export { UpdateAvatarUseCase };
