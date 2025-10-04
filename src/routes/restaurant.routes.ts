import { Router } from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurant.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getRestaurants);
router.get("/:id", getRestaurantById);

router.post("/", authMiddleware, authorizeRoles("RESTAURANT"), createRestaurant);
router.put("/:id", authMiddleware, authorizeRoles("RESTAURANT"), updateRestaurant);
router.delete("/:id", authMiddleware, authorizeRoles("RESTAURANT"), deleteRestaurant);

export default router;
