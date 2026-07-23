import { readFile, writeFile } from "fs/promises";
import path from "path";
import bcrypt from "bcrypt";
import { User } from "../types/index.js";

const usersFile = path.join(__dirname, "../data/users.json");

// Função auxilixar interna para ler e converter o JSON
const readDatabase = async (): Promise<User[]> => {
  try {
    const data = await readFile(usersFile, { encoding: "utf-8" });
    return JSON.parse(data) as User[];
  } catch (error) {
    return [];
  }
};

// Função auxiliar para interna para salvar no arquivo JSON
const writeDatabase = async (data: User[]): Promise<void> => {
  await writeFile(usersFile, JSON.stringify(data, null, 2)); // null e 2 para formatar o JSON
};

export const register = async ({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}): Promise<User> => {
  const users = await readDatabase();

  const userExists = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (userExists) {
    throw new Error("E-mail já cadastrado.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  // Pega o maior ID atual de forma segura
  const nextId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const newUser: User = {
    id: nextId,
    name,
    email,
    password: hashedPassword,
    role: "customer",
  };

  users.push(newUser);

  // Salva usando a função auxiliar
  await writeDatabase(users);

  // Oculta a senha do retorno por segurança
  const { password: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
};

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<User> => {
  const users = await readDatabase();
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase(),
  );

  if (!user || !user.password) {
    throw new Error("Usuário ou senha inválidos.");
  }

  const passWordMatch = await bcrypt.compare(password, user.password);

  if (!passWordMatch) {
    throw new Error("Usuário ou senha inválidos.");
  }
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
