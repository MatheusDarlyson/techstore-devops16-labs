import { Request, Response } from "express";
import * as authService from "../services/authService";

// Função para lidar com o login do usuário
export const login = async (req: Request, res: Response) => {
  try {
    const user = await authService.login(req.body);

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      user,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return res.status(400).json({
      message: errorMessage,
    });
  }
};

// Função para lidar com o registro do usuário
export const register = async (req: Request, res: Response) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
      message: "Usuário registrado com sucesso.",
      user,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Erro desconhecido";
    return res.status(400).json({
      message: errorMessage,
    });
  }
};
