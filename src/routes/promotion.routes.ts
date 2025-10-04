import { Router } from "express";
import {
  createPromotion,
  getPromotions,
  getPromotionById,
  updatePromotion,
  deletePromotion,
} from "../controllers/promotion.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.get("/", getPromotions);
router.get("/:id", getPromotionById);

router.post("/", authMiddleware, authorizeRoles("RESTAURANT"), createPromotion);
router.put("/:id", authMiddleware, authorizeRoles("RESTAURANT"), updatePromotion);
router.delete("/:id", authMiddleware, authorizeRoles("RESTAURANT"), deletePromotion);

export default router;
