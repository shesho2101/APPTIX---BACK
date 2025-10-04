import { Router } from "express";
import {
  addFavorite,
  getFavoritesByUser,
  removeFavorite,
} from "../controllers/favorite.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

router.post("/", authMiddleware, authorizeRoles("CUSTOMER"), addFavorite);
router.get("/:userId", authMiddleware, authorizeRoles("CUSTOMER"), getFavoritesByUser);
router.delete("/", authMiddleware, authorizeRoles("CUSTOMER"), removeFavorite);

export default router;
