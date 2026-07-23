import { Request, Response } from "express";
import * as productService from "../services/productService.js";

// Função para listar todos os produtos
export const listProducts = async (re: Request, res: Response) => {
  try {
    const products = await productService.getProducts();
    return res.status(200).json(products);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao listar produtos.";
    return res.status(500).json({ message: errorMessage });
  }
};

// Função para criar (cadastrar) um novo produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);

    return res.status(201).json({
      message: "Produto criado com sucesso.",
      product,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao criar produto.";
    return res.status(500).json({ message: errorMessage });
  }
};

// Função para atualizar um produto existente
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID do produto inválido." });
    }

    const product = await productService.updateProduct(productId, req.body);
    return res.status(200).json({
      message: "Produto atualizado com sucesso.",
      product,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao atualizar produto.";
    return res.status(500).json({ message: errorMessage });
  }
};

// Função para deletar um produto existente
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ message: "ID do produto inválido." });
    }

    const product = await productService.deleteProduct(productId);
    return res.status(200).json({
      message: "Produto deletado com sucesso.",
      product,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro ao deletar produto.";
    return res.status(500).json({ message: errorMessage });
  }
};
