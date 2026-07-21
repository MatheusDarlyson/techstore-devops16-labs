
const fs = require("fs"); 
const path = require("path");

const usersFile = path.join(__dirname, "../data/users.json"); 

// Funcao para ler os usuarios do arquivo JSON
const getUsers = () => {
    const data = fs.readFileSync(usersFile, "utf8");
    return JSON.parse(data);
};

// Funcao para salvar os usuarios no arquivo JSON
const saveUsers = (users) => {
    fs.writeFileSync(
        usersFile,
        JSON.stringify(users, null, 4),
        "utf8"
    );
};

module.exports = {
    getUsers,
    saveUsers
};