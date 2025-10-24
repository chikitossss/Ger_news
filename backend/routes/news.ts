import { Router } from "express";
import { News } from "../models/news";

const router = Router();
let newsDB: News[] = []; // временное хранилище новостей

router.get("/", (req, res) => res.json(newsDB));

router.post("/", (req, res) => {
  const newArticle: News = { ...req.body, id: Date.now().toString(), source: 'manual' };
  newsDB.push(newArticle);
  res.status(201).json(newArticle);
});

export default router;
