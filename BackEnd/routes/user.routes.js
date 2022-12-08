import { Router } from "express";
import { controller } from "../controllers/user.controllers.js";

const router = Router();

router.get("/", controller.test);
router.post("/AppSafe/createUser", controller.createUser);
router.put(
    "/AppSafe/enable2FA/:id",
    controller.verifyToken,
    controller.enable2FA
);
router.put("/AppSafe/disable2FA/:id", controller.disable2FA);
router.post("/AppSafe/authUser", controller.authUser);
router.post("/AppSafe/user/generateJWT", controller.generateJWT);

export default router;
