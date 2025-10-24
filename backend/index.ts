import express from "express";
import cors from "cors";
import newsRoutes from "./routes/news.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/news", newsRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
