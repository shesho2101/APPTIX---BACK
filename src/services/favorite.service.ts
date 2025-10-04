import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addFavorite = async (userId: number, promotionId: number) => {
  return prisma.favorite.create({
    data: { userId, promotionId },
  });
};

export const getFavoritesByUser = async (userId: number) => {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      promotion: {
        include: {
          restaurant: { select: { id: true, name: true, city: true } },
        },
      },
    },
  });
};

export const removeFavorite = async (userId: number, promotionId: number) => {
  return prisma.favorite.delete({
    where: { userId_promotionId: { userId, promotionId } },
  });
};
