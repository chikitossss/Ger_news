// src/bot/newsapiService.ts
import axios from "axios";

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  photo?: string;
  video?: string;
}

const NEWSAPI_KEY = "6c439059003f4af2a86bb7df0a23dbf4"; // твой ключ
const NEWSAPI_URL = "https://newsapi.org/v2/top-headlines?language=ru&pageSize=20";

export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    const res = await axios.get(`${NEWSAPI_URL}&apiKey=${NEWSAPI_KEY}`);
    const articles = res.data.articles || [];
    return articles.map((item: any, index: number) => ({
      id: item.url || `newsapi-${index}`,
      title: item.title,
      description: item.description || "",
      link: item.url,
      pubDate: item.publishedAt,
      source: item.source?.name || "NewsAPI",
      photo: item.urlToImage,
      video: undefined
    }));
  } catch (err) {
    console.error("❌ Ошибка NewsAPI:", err);
    return [];
  }
}
