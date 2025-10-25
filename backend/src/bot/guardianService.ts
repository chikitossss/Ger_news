// src/bot/guardianService.ts
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

const GUARDIAN_KEY = "04554247-a83f-4c37-aa95-8033a55b06b9"; // твой ключ
const GUARDIAN_URL = "https://content.guardianapis.com/search?show-fields=thumbnail,bodyText&order-by=newest&page-size=20";

export async function fetchAllNews(): Promise<NewsItem[]> {
  try {
    const res = await axios.get(`${GUARDIAN_URL}&api-key=${GUARDIAN_KEY}`);
    const results = res.data.response?.results || [];
    return results.map((item: any) => ({
      id: item.id,
      title: item.webTitle,
      description: item.fields?.bodyText?.slice(0, 200) || "",
      link: item.webUrl,
      pubDate: item.webPublicationDate,
      source: "The Guardian",
      photo: item.fields?.thumbnail,
      video: undefined
    }));
  } catch (err) {
    console.error("❌ Ошибка Guardian:", err);
    return [];
  }
}
