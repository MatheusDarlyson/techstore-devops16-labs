// Faz o import do serviço de autenticação
const authService = require("../services/authService"); 

// Função para lidar com o login do usuário
const login = (req, res) => {
    return res.status(200).json({
        message: "Login endpoint"
    });
};

// Função para lidar com o registro do usuário
const register = (req, res) => {
    return res.status(201).json({
        message: "Register endpoint"
    });
};

// Exporta as funções de login e registro para serem usadas em outros arquivos
module.exports = {
    login,
    register
};