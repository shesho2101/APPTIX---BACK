import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRestaurant = async (data: {
  name: string;
  description: string;
  phone: string;
  address: string;
  city: string;
  userId: number;
}) => {
  return prisma.restaurant.create({ data });
};

export const getRestaurants = async () => {
  return prisma.restaurant.findMany({
    include: { user: { select: { id: true, name: true, email: true } } },
  });
};

export const getRestaurantById = async (id: number) => {
  return prisma.restaurant.findUnique({
    where: { id },
    include: { user: { select: { id: true, name: true, email: true } } },
  });
};

export const updateRestaurant = async (id: number, data: any) => {
  return prisma.restaurant.update({ where: { id }, data });
};

export const deleteRestaurant = async (id: number) => {
  return prisma.restaurant.delete({ where: { id } });
};
