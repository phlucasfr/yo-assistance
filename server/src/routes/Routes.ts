import { AuthController } from "../controllers/AuthController";
import { authMiddleware } from "../middlewares/authUser";
import { SendMessageService } from "../services/SendMessageService";
import { Router } from "express";
import { UserController } from "../controllers/UserController";

const authController = new AuthController;
const userController = new UserController;
export const sendMsgSrv = new SendMessageService;
export const router = Router();

//user routes
router.get("/listuser/", userController.indexUserById);
router.get("/listusers/", userController.indexUsers);
router.post("/createuser/", userController.storeUser);
router.get("/recoverypasswrd/", userController.reqRecovPass);
router.put("/alteruser/", authMiddleware, userController.alterUser);
router.delete("/deleteuser/", userController.deleteUser);

//auth routes
router.post("/authuser/", authController.authUser);