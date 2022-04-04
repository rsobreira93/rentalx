import { Router } from "express";
import multer from "multer";

import uploadConfig from "../config/upload";
import { ensureAuthenticated } from "../middlewares/ensureAthenticated";
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController";
import { UpdateAvatarController } from "../modules/accounts/useCases/updateUserAvatar/UpdateAvatarController";

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
