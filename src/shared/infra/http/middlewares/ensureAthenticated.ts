import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("JWT token is missing", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, auth.secret_token);

    const { sub: user_id } = decoded as IPayload;

    request.user = {
      id: user_id,
    };

    return next();
  } catch {
    throw new AppError("Invalid JWT token", 401);
  }
}
