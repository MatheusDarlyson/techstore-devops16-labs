import { Router } from "express";
import * as authController from "../controllers/authController.js";

const router = Router();

// Rota para login de usuarios
router.post("/login", authController.login);

// Rota para registro de usuarios
router.post("/register", authController.register);

export default router;
