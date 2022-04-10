import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { Router } from "express";

import { ensureAdmin } from "@shared/infra/http/middlewares/ensureAdmin";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";

const carsRoutes = Router();
const carsController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const carSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/", ensureAuthenticated, ensureAdmin, carsController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post(
  "/specifications/:id",
  ensureAuthenticated,
  ensureAdmin,
  carSpecificationController.handle
);
export { carsRoutes };
