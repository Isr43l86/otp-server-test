import { Router } from "express";
import { controller } from "../controllers/otp.controllers.js";

const router = Router();

router.post("/AppSafe/generateJWT", controller.generateJWT);
router.post("/AppSafe/sendOTP", controller.verifToken, controller.sendOTP);

export default router;
