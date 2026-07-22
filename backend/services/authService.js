

const fs = require("fs"); 
const path = require("path");
const bcrypt = require("bcrypt"); 

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

// Funcao para registrar um novo usuario
const register = async ({ name, email, password }) => { 

    const users = getUsers();

    const userExists = users.find(
        user => user.email === email
    );

    if (userExists) {
        throw new Error("E-mail já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: users.length + 1,
        name,
        email,
        password: hashedPassword,
        role: "customer"
    };

    users.push(newUser);

    saveUsers(users);

    return {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
    };
};

// Funcao para realizar o login do usuario
const login = async ({ email, password }) => {

    const users = getUsers();

    const user = users.find(
        user => user.email === email
    );

    if (!user) {
        throw new Error("E-mail ou senha inválidos.");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!passwordMatch) {
        throw new Error("E-mail ou senha inválidos.");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };
};


module.exports = {
    getUsers,
    saveUsers,
    register,
    login
};