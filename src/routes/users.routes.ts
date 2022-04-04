import { Router } from "express";

import { CreateUserController } from "../modules/accounts/useCases/CreateUserController";

const usersRouters = Router();
const userController = new CreateUserController();

usersRouters.post("/", userController.handle);

export { usersRouters };
