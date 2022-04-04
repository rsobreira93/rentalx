import { Router } from "express";

import { AuthenticateUserController } from "../modules/accounts/useCases/AuthenticateUser/AuthenticateUserController";

const authenticateRoutes = Router();
const athenticateControler = new AuthenticateUserController();

authenticateRoutes.post("/sessions", athenticateControler.handle);

export { authenticateRoutes };
