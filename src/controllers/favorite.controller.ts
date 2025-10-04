import { Request, Response } from "express";
import * as favoriteService from "../services/favorite.service";

export const addFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, promotionId } = req.body;
    const favorite = await favoriteService.addFavorite(userId, promotionId);
    res.status(201).json(favorite);
  } catch (error) {
    res.status(500).json({ error: "Error al guardar favorito" });
  }
};

export const getFavoritesByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const favorites = await favoriteService.getFavoritesByUser(userId);
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener favoritos" });
  }
};

export const removeFavorite = async (req: Request, res: Response) => {
  try {
    const { userId, promotionId } = req.body;
    await favoriteService.removeFavorite(userId, promotionId);
    res.json({ message: "Favorito eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar favorito" });
  }
};
