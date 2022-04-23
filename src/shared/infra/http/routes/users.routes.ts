import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateAvatarController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAthenticated";

const usersRouters = Router();

const uploadAvatar = multer(uploadConfig);

const userController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

usersRouters.post("/", userController.handle);

usersRouters.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

export { usersRouters };
