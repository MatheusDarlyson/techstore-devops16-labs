const app = require("./app"); // Importando a instância do aplicativo Express do arquivo app.js

// Definindo a porta do servidor a partir das variáveis de ambiente ou usando a porta padrão 3000
const PORT = process.env.PORT || 3000;

// Iniciando o servidor e ouvindo na porta definida
app.listen(PORT, () => {
    console.log("=================================");
    console.log("🚀 TechStore API iniciada");
    console.log(`📍 http://localhost:${PORT}`); // Exibe a URL do servidor no console
    console.log("=================================");
});