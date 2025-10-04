import { Request, Response } from "express";
import * as restaurantService from "../services/restaurant.service";

export const createRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantService.createRestaurant(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Error al crear restaurante" });
  }
};

export const getRestaurants = async (_req: Request, res: Response) => {
  try {
    const restaurants = await restaurantService.getRestaurants();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener restaurantes" });
  }
};

export const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantService.getRestaurantById(Number(req.params.id));
    if (!restaurant) return res.status(404).json({ error: "Restaurante no encontrado" });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener restaurante" });
  }
};

export const updateRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await restaurantService.updateRestaurant(Number(req.params.id), req.body);
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar restaurante" });
  }
};

export const deleteRestaurant = async (req: Request, res: Response) => {
  try {
    await restaurantService.deleteRestaurant(Number(req.params.id));
    res.json({ message: "Restaurante eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar restaurante" });
  }
};
