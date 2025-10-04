import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes";
import restaurantRoutes from "./routes/restaurant.routes";
import promotionRoutes from "./routes/promotion.routes";
import favoriteRoutes from "./routes/favorite.routes";
import authRoutes  from "./routes/auth.routes";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/promotions", promotionRoutes);
app.use("/api/favorites", favoriteRoutes);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de Restaurantes y Promociones!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
