// Importando as dependências necessárias
const express = require("express");

const router = express.Router(); // Criando uma instância do roteador Express

const authRoutes = require("./authRoutes"); // Importando as rotas de autenticação

const productRoutes = require("./productRoutes"); // Importando as rotas de produtos

// Rota de saúde da API
router.get("/health", (req, res) => {
    res.status(200).json({
        status: "online",
        application: "TechStore API",
        version: "1.0.0"
    });
});


//Rotas de autenticação
router.use("/auth", authRoutes); // Usando as rotas de autenticação com o prefixo "/auth"
router.use("/products", productRoutes); // Usando as rotas de produtos com o prefixo "/products"

module.exports = router;