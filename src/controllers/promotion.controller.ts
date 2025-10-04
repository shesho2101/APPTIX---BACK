import { Request, Response } from "express";
import * as promotionService from "../services/promotion.service";

export const createPromotion = async (req: Request, res: Response) => {
  try {
    const promotion = await promotionService.createPromotion(req.body);
    res.status(201).json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Error al crear promoción" });
  }
};

export const getPromotions = async (_req: Request, res: Response) => {
  try {
    const promotions = await promotionService.getPromotions();
    res.json(promotions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener promociones" });
  }
};

export const getPromotionById = async (req: Request, res: Response) => {
  try {
    const promotion = await promotionService.getPromotionById(Number(req.params.id));
    if (!promotion) return res.status(404).json({ error: "Promoción no encontrada" });
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener promoción" });
  }
};

export const updatePromotion = async (req: Request, res: Response) => {
  try {
    const promotion = await promotionService.updatePromotion(Number(req.params.id), req.body);
    res.json(promotion);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar promoción" });
  }
};

export const deletePromotion = async (req: Request, res: Response) => {
  try {
    await promotionService.deletePromotion(Number(req.params.id));
    res.json({ message: "Promoción eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar promoción" });
  }
};
