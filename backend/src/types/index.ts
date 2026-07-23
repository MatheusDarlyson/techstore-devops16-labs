export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // Opcional ao retornar o usuário para a API (para omitir a hash da senha)
  role: "customer" | "admin";
}
