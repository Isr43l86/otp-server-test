import { Router } from "express";
import { controller } from "../controllers/otp.controllers.js";

const router = Router();

router.post("/AppSafe/generateJWT", controller.generateJWT);
router.post("/AppSafe/sendOTPgenerated", controller.sendOTP);
router.get("/AppSafe/getOTPinfo", controller.getOTPinfo);

export default router;
