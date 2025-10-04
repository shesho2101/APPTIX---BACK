import { Router } from "express";
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";

const router = Router();

// Registro público
router.post("/", createUser);

// Solo ADMIN puede gestionar usuarios
router.get("/", authMiddleware, authorizeRoles("ADMIN"), getUsers);
router.get("/:id", authMiddleware, authorizeRoles("ADMIN"), getUserById);
router.put("/:id", authMiddleware, authorizeRoles("ADMIN"), updateUser);
router.delete("/:id", authMiddleware, authorizeRoles("ADMIN"), deleteUser);

export default router;
