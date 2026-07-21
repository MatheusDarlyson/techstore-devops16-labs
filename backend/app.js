require("dotenv").config(); // Carrega as variáveis de ambiente do arquivo .env

// Importando as dependências necessárias
const express = require("express");
const cors = require("cors");

const routes = require("./routes"); // Importando as rotas da API

// Criando uma instância do aplicativo Express
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api", routes); // Registrando as rotas da API com o prefixo "/api"

module.exports = app;