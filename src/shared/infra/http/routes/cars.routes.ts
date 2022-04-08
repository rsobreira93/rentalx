import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { Router } from "express";

const carsRoutes = Router();
const carsController = new CreateCarController();

carsRoutes.post("/", carsController.handle);

export { carsRoutes };
