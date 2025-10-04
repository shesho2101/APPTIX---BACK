import { Request, Response, NextFunction } from "express";

export const authorizeRoles = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      return res.status(401).json({ error: "No autenticado" });
    }

    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "No tienes permisos para esta acción" });
    }

    next();
  };
};
