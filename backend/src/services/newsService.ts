// src/service/newsService.ts
import axios from "axios";

// Тип новости
export interface NewsItem {
  id: string;            // уникальный идентификатор
  title: string;         // заголовок новости
  description?: string;  // краткое описание
  photo?: string;        // ссылка на фото
  video?: string;        // ссылка на видео
}

// URL вашего бекенда с API новостей
const API_NEWS_URL = "http://localhost:5000/api/news";

// Функция для получения всех новостей
export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    const res = await axios.get(API_NEWS_URL, { timeout: 5000 });
    const data = res.data;

    if (!Array.isArray(data)) {
      console.error("❌ Сервер вернул не массив новостей", data);
      return [];
    }

    // Преобразуем данные к NewsItem
    const news: NewsItem[] = data.map((item: any) => ({
      id: item.id?.toString() || item._id?.toString() || item.title,
      title: item.title || "Без заголовка",
      description: item.description || item.text || "",
      photo: item.photo || item.image || "",
      video: item.video || "",
    }));

    return news;
  } catch (err) {
    console.error("❌ Ошибка при получении новостей с бекенда:", err);
    return [];
  }
}
