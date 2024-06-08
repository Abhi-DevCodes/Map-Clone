import express from "express";
import {
  registrationController,
  loginController,
  verifyOtpController,
} from "../controllers/userController.js";

const router = express.Router();
router.post("/register", registrationController);
router.post("/signin", loginController);
router.post("/verifyotp", verifyOtpController);

export default router;
