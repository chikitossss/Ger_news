import React, { useEffect, useState } from "react";
import { getNews } from "../services/newsAPI";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    getNews().then(setNews).catch(console.error);
  }, []);

  return (
    <div className="news-list">
      {news.map((n) => (
        <NewsCard key={n.id} {...n} />
      ))}
    </div>
  );
}
