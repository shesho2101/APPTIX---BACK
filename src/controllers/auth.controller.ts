import { Request, Response } from "express";
import prisma from "../prisma";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt";

// Registro
export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ error: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role },
    });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error en el registro" });
  }
};

// Login
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = generateToken({ id: user.id, role: user.role });

    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: "Error en el login" });
  }
};
