import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";
import { Router } from "express";

const authenticateRoutes = Router();
const athenticateControler = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();

authenticateRoutes.post("/sessions", athenticateControler.handle);
authenticateRoutes.post("/refresh_token", refreshTokenController.handle);

export { authenticateRoutes };
