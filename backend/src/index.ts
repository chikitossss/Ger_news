// src/index.ts
import express from "express";
import cors from "cors";
import newsRouter from "./routes/news";

const app = express();
const PORT = 5000;

// ===== Middleware =====
app.use(cors());
app.use(express.json());

// ===== Роуты =====
app.use("/api/news", newsRouter);

// ===== Старт сервера =====
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
