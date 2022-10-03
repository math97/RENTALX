import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private userstokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}
  async execute(token: string): Promise<ITokenResponse> {
    const {
      secret_refresh_token,
      expiresIn_refresh_token,
      expires_refresh_token_days,
      secret_token,
      expiresIn,
    } = auth;

    const { email, sub: user_id } = verify(
      token,
      secret_refresh_token
    ) as IPayload;

    const userToken =
      await this.userstokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) throw new AppError("Refresh Token does not exists!");

    await this.userstokensRepository.deleteById(userToken.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expiresIn_refresh_token,
    });

    const expires_date = this.dayjsDateProvider.addDays(
      expires_refresh_token_days
    );

    await this.userstokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn,
    });

    return { refresh_token, token: newToken };
  }
}

export { RefreshTokenUseCase };
