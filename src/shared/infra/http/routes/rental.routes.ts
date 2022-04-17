import { CreateRentalController } from "@modules/rentals/useCase/createRental/CreateRentalController";
import { DevolutionRentalController } from "@modules/rentals/useCase/devolutionRental/DevolutionRentalController";
import { ListRentalsByUserController } from "@modules/rentals/useCase/listRentalsByUser/ListRentalsByUserController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const rentalRoutes = Router();
const rentalController = new CreateRentalController();
const devolutionController = new DevolutionRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  rentalController.handle
);

rentalRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  ensureAdmin,
  devolutionController.handle
);

rentalRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalRoutes };
