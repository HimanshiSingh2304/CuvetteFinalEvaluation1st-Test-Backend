import express from "express";
import { signUp, login } from "../../Controllers/Auth.js";
import { setPreference } from "../../Controllers/preferenceController.js";
import { authMiddleware } from "../../Middleware/authmiddleware.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.post("/preference", authMiddleware, setPreference);

export default router;
