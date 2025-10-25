// src/newsService.ts
import axios from "axios";
import Parser from "rss-parser";

const parser = new Parser();

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

const RSS_SOURCES = [
  { name: "BBC Russian", url: "http://feeds.bbci.co.uk/russian/rss.xml" },
  { name: "NV.ua", url: "https://nv.ua/rss/all.xml" },
];

const NEWSAPI_KEY = "6c439059003f4af2a86bb7df0a23dbf4";
const NEWSAPI_SOURCES = [
  "cnn",
  "the-verge",
  "bbc-news",
  "reuters"
];

// ===== RSS =====
async function fetchSourceNews(source: { name: string; url: string }): Promise<NewsItem[]> {
  try {
    const feed = await parser.parseURL(source.url);
    return feed.items.map((item: any) => ({
      id: item.guid || `${source.name}-${item.link}`,
      title: item.title,
      description: item.contentSnippet || "",
      link: item.link,
      pubDate: item.pubDate,
      source: source.name,
      photo: item.enclosure?.type?.startsWith("image") ? item.enclosure.url : undefined,
      video: item.enclosure?.type?.startsWith("video") ? item.enclosure.url : undefined
    }));
  } catch (err: any) {
    console.error(`❌ RSS ${source.name}:`, err.message || err);
    return [];
  }
}

// ===== NewsAPI =====
async function fetchNewsApi(): Promise<NewsItem[]> {
  try {
    const url = `https://newsapi.org/v2/top-headlines?sources=${NEWSAPI_SOURCES.join(",")}&pageSize=50&apiKey=${NEWSAPI_KEY}`;
    const res = await axios.get(url);
    if (!Array.isArray(res.data.articles)) return [];
    return res.data.articles.map((a: any) => ({
      id: a.url,
      title: a.title,
      description: a.description || "",
      link: a.url,
      pubDate: a.publishedAt,
      source: a.source.name,
      photo: a.urlToImage
    }));
  } catch (err) {
    console.error("❌ NewsAPI:", err);
    return [];
  }
}

// ===== Главная функция =====
export async function fetchAllNews(): Promise<NewsItem[]> {
  const rssNews = await Promise.all(RSS_SOURCES.map(fetchSourceNews));
  const apiNews = await fetchNewsApi();
  const allNews = [...rssNews.flat(), ...apiNews];
  allNews.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
  return allNews;
}
