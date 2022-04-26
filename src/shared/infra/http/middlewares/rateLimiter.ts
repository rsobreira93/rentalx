import { NextFunction, Request, Response } from "express";
import { RateLimiterRedis } from "rate-limiter-flexible";
import redis from "redis";

import { AppError } from "@shared/errors/AppError";

export default async function rateLimiter(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const redisClient = redis.createClient({
    host: "localhost",
    port: Number(process.env.REDIS_PORT),
  });

  //   await redisClient.connect();

  const limiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "ratelimit",
    points: 10,
    duration: 5,
  });

  try {
    await limiter.consume(request.ip);

    return next();
  } catch (err) {
    throw new AppError("Too many requests", 429);
  }
}
