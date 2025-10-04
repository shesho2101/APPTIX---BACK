import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
  role?: Role;
}) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);
  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
      role: data.role || "CUSTOMER",
    },
  });
};

export const getUsers = async () => {
  return prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
};

export const getUserById = async (id: number) => {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true, role: true, createdAt: true },
  });
};

export const updateUser = async (id: number, data: any) => {
  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: number) => {
  return prisma.user.delete({ where: { id } });
};

export const findByEmail = async (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};
