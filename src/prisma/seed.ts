import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  // Usuario tipo restaurante
  const user = await prisma.user.create({
    data: {
      name: "Restaurante Demo",
      email: "demo@rest.com",
      password: hashedPassword,
      role: "RESTAURANT",
    },
  });

  // Restaurante ligado al usuario
  const restaurant = await prisma.restaurant.create({
    data: {
      name: "Demo Burgers",
      description: "Las mejores hamburguesas demo",
      phone: "3001234567",
      address: "Cra 45 #12-34",
      city: "Medellín",
      userId: user.id,
    },
  });

  // Promoción de prueba
  await prisma.promotion.create({
    data: {
      title: "2x1 en Burgers",
      description: "Aplica solo fines de semana",
      discountType: "PERCENTAGE",
      discountValue: 50.0,
      startAt: new Date(),
      endAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      restaurantId: restaurant.id,
    },
  });

  console.log("Seed completado ✅");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
