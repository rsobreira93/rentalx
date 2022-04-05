import { AuthenticateUserController } from "@modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";
import { Router } from "express";

const authenticateRoutes = Router();
const athenticateControler = new AuthenticateUserController();

authenticateRoutes.post("/sessions", athenticateControler.handle);

export { authenticateRoutes };
