// Faz o import do serviço de autenticação
const authService = require("../services/authService"); 

// Função para lidar com o login do usuário
const login = async (req, res) => {

    try {

        const user = await authService.login(req.body);

        return res.status(200).json({
            message: "Login realizado com sucesso.",
            user
        });

    } catch (error) {

        return res.status(401).json({
            message: error.message
        });

    }

};

// Função para lidar com o registro do usuário
const register = async (req, res) => {

    try {

        const user = await authService.register(req.body);

        return res.status(201).json({
            message: "Usuário cadastrado com sucesso.",
            user
        });

    } catch (error) {

        return res.status(400).json({
            message: error.message
        });

    }

};

// Exporta as funções de login e registro para serem usadas em outros arquivos
module.exports = {
    login,
    register
};