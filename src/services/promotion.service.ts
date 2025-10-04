import { PrismaClient, DiscountType, PromotionStatus } from "@prisma/client";

const prisma = new PrismaClient();

export const createPromotion = async (data: {
  title: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  startAt: Date;
  endAt: Date;
  restaurantId: number;
}) => {
  return prisma.promotion.create({ data });
};

export const getPromotions = async () => {
  return prisma.promotion.findMany({
    include: {
      restaurant: { select: { id: true, name: true, city: true } },
    },
  });
};

export const getPromotionById = async (id: number) => {
  return prisma.promotion.findUnique({
    where: { id },
    include: {
      restaurant: { select: { id: true, name: true, city: true } },
    },
  });
};

export const updatePromotion = async (id: number, data: any) => {
  return prisma.promotion.update({
    where: { id },
    data,
  });
};

export const deletePromotion = async (id: number) => {
  return prisma.promotion.delete({ where: { id } });
};
