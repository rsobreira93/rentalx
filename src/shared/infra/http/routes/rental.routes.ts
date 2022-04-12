import { CreateRentalController } from "@modules/rentals/useCase/CreateRentalController";
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAthenticated";

import { ensureAdmin } from "../middlewares/ensureAdmin";

const rentalRoutes = Router();
const rentalController = new CreateRentalController();

rentalRoutes.post(
  "/",
  ensureAuthenticated,
  ensureAdmin,
  rentalController.handle
);

export { rentalRoutes };
