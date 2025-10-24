import { Router } from "express";
import { News } from "../models/news";
import { sendNews } from "../services/telegramBot";

const router = Router();
let newsList: News[] = [];

router.get("/", (req, res) => {
  res.json(newsList);
});

router.post("/", (req, res) => {
  const news: News = { id: Date.now(), ...req.body };
  newsList.unshift(news);
  sendNews(news);
  res.status(201).json(news);
});

export default router;
