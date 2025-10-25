import express from "express";
import cors from "cors";
import newsRouter from "./routes/news";

const app = express();
app.use(cors());
app.use(express.json({ type: 'application/json', limit: '10mb' }));

app.use("/api/news", newsRouter);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

export default app;
