// backend/routes/productRoutes.js
const express = require("express");

const router = express.Router(); // Cria uma instância do roteador do Express

// Faz o import do controlador de produtos
const productController = require("../controllers/productController"); 

// Define as rotas para os produtos
router.get("/", productController.listProducts);
router.post("/", productController.createProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

module.exports = router;