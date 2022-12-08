import { Router } from "express";
import { controller } from "../controllers/app.controllers.js";

const router = Router();

router.post("/AppSafe/setAppInfo", controller.setAppInfo);
router.get("/AppSafe/getAppInfo", controller.getAppInfo);

export default router;
