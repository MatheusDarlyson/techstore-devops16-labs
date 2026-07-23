import path from "path";
import { Product } from "../types/index";
import { readDatabase, writeDatabase } from "../utils/fileHandler.js";

// Faz o import do serviço de autenticação
const productsFile = path.join(__dirname, "../data/products.json");

// Funcao para ler os produtos do arquivo JSON
export const getProducts = (): Promise<Product[]> => {
  return readDatabase<Product>(productsFile);
};

// Funcao para criar (cadastrar) um novo produto
export const createProduct = async (
  productData: Omit<Product, "id">, //remove o id da entrada
): Promise<Product> => {
  const products = await readDatabase<Product>(productsFile);

  const nextId =
    products.length === 0 ? 1 : Math.max(...products.map((p) => p.id)) + 1;

  const newProduct: Product = { id: nextId, ...productData };
  products.push(newProduct);

  await writeDatabase<Product>(productsFile, products);
  return newProduct;
};

// Funcao para atualizar um produto existente
export const updateProduct = async (
  id: number,
  updatedData: Partial<Product>, //partial torna tudo opcional
): Promise<Product> => {
  const products = await readDatabase<Product>(productsFile);

  const index = products.findIndex((product) => product.id === Number(id));

  if (index === -1) {
    throw new Error("Produto não encontrado.");
  }

  // Atualiza preservando o ID original
  products[index] = {
    ...products[index],
    ...updatedData,
    id: products[index].id,
  };

  await writeDatabase<Product>(productsFile, products);

  return products[index];
};

// Funcao para excluir um produto
export const deleteProduct = async (id: number): Promise<Product> => {
  const products = await readDatabase<Product>(productsFile);

  const index = products.findIndex((product) => product.id === Number(id));

  if (index === -1) {
    throw new Error("Produto não encontrado.");
  }

  const deletedProduct = products[index];

  // Remove o produto do array
  products.splice(index, 1);

  await writeDatabase<Product>(productsFile, products);

  return deletedProduct;
};
