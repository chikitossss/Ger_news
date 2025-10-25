import express from "express";
import cors from "cors";
import newsRouter from "./routes/news";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Подключаем маршруты
app.use("/api/news", newsRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
