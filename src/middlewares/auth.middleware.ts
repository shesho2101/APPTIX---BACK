import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token requerido" });

  try {
    const decoded = verifyToken(token);
    (req as any).user = decoded; // guardamos el usuario en req
    next();
  } catch {
    res.status(401).json({ error: "Token inválido" });
  }
};
