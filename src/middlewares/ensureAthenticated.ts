import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPaylod {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "5afd22e6c29ba0cf5510e8dc2d3c0a07");

    const { sub: user_id } = decoded as IPaylod;

    const usersRepository = new UsersRepository();

    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User does not exists");
    }

    return next();
  } catch {
    throw new Error("Invalid JWT token");
  }
}
