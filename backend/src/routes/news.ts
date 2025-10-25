// src/routes/news.ts
import { Router } from "express";
import { fetchAllNews as fetchNewsAPI } from "../bot/newsapiService";
import { fetchAllNews as fetchGuardianNews } from "../bot/guardianService";
import translate from "@vitalets/google-translate-api";

const router = Router();

// GET /api/news
router.get("/", async (req, res) => {
  try {
    // Получаем новости с двух источников
    const [newsAPI, guardian] = await Promise.all([
      fetchNewsAPI(),
      fetchGuardianNews()
    ]);

    const allNews = [...newsAPI, ...guardian];

    // Если нужен перевод на русский
    const translatedNews = await Promise.all(
      allNews.map(async (item) => {
        try {
          if (item.title) {
            const translated = await translate(item.title, { to: "ru" });
            return { ...item, title_ru: translated.text };
          }
          return item;
        } catch (err) {
          console.error("Ошибка перевода:", err);
          return item;
        }
      })
    );

    res.json(translatedNews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка при получении новостей" });
  }
});

export default router;
