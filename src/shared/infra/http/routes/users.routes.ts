import uploadConfig from "@config/upload";
import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateAvatarController";
import { Router } from "express";
import multer from "multer";

import { ensureAuthenticated } from "../middlewares/ensureAthenticated";

const usersRouters = Router();

const updloadAvatar = multer(uploadConfig.upload("./tmp/avatar"));

const userController = new CreateUserController();
const updateAvatarController = new UpdateAvatarController();

usersRouters.post("/", userController.handle);

usersRouters.patch(
  "/avatar",
  ensureAuthenticated,
  updloadAvatar.single("avatar"),
  updateAvatarController.handle
);

export { usersRouters };
