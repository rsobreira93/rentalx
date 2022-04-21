import { ICreateUserTokensDTO } from "../dtos/ICreateUserTokensDTO";
import { UserTokens } from "../infra/typeorm/entities/UserTokens";

interface IUsersTokensRepository {
  create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokensDTO): Promise<UserTokens>;

  findByUserIdAndRefreshToken(
    user_id: string,
    token: string
  ): Promise<UserTokens>;

  deleteById(id: string): Promise<void>;

  findByToken(token: string): Promise<UserTokens>;
}

export { IUsersTokensRepository };
