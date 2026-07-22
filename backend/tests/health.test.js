require("dotenv").config();

const PORT = process.env.PORT || 3000;
const API_URL = `http://localhost:${PORT}/api/health`;

// Função para executar o teste de health check

async function runTest() {

    console.log("\n🧪 Iniciando testes da TechStore API...\n");

    try {

        const response = await fetch(API_URL);

        if (response.status !== 200) {

            console.error(`❌ Teste falhou! Status recebido: ${response.status}`);

            process.exit(1);

        }

        const body = await response.json();

        console.log("✔ API respondeu com status 200");
        console.log(`✔ Aplicação: ${body.application}`);
        console.log(`✔ Versão: ${body.version}`);
        console.log("\n🎉 Health Check aprovado!");

        process.exit(0);

    } catch (error) {

        console.error("❌ Não foi possível conectar à API.");
        console.error(error.message);

        process.exit(1);

    }

}

runTest();