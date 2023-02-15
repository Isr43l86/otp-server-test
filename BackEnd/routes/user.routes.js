import { Router } from "express";
import { controller } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", controller.test);
router.post("/AppSafe/createUser", controller.createUser);
router.put("/AppSafe/disable2FA/:id", controller.disable2FA);
router.post("/AppSafe/authUser", controller.authUser);
router.put("/AppSafe/testEnable2FA/:id", controller.enable2FA);

export default router;
