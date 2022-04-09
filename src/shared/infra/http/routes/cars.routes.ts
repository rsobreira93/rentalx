import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";

const carsRoutes = Router();
const carsController = new CreateCarController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, carsController.handle);

export { carsRoutes };
