import { Router, Request, Response } from "express";
import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

// Rota de saúde da API
router.get("/health", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "online",
    application: "TechStore API",
    version: "1.0.0",
  });
});

// Agrupamento das sub-rotas
router.use("/auth", authRoutes);
router.use("/products", productRoutes);

export default router;
