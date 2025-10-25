import { Router } from "express";
import { fetchAllNews } from "../services/newsService";

const router = Router();
let newsList: any[] = [];

router.get("/", async (req, res) => {
  res.json(newsList);
});

// Автоматическое обновление новостей каждые 1.5 часа
async function updateNews() {
  const fetched = await fetchAllNews();
  newsList = fetched; // заменяем старый массив
  console.log(`Обновлено новостей: ${newsList.length}`);
}

// Запускаем сразу при старте
updateNews();
// И повторяем каждые 1.5 часа (5400 секунд)
setInterval(updateNews, 5400 * 1000);

export default router;
