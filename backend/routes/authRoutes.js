const express = require("express"); // Importando o módulo Express

const router = express.Router(); // Criando uma instância do roteador Express

const authController = require("../controllers/authController"); // Importando o controlador de autenticação


router.post("/login", authController.login); // Definindo a rota POST para login, que chama a função de login do controlador de autenticação

router.post("/register", authController.register); // Definindo a rota POST para registro, que chama a função de registro do controlador de autenticação

// Exportando o roteador para ser usado em outros arquivos
module.exports = router;