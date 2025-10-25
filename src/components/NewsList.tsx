import React, { useEffect, useState } from "react";

interface News {
  id: number;
  title: string;
  description: string;
  link: string;
  photo?: string;
}

const NewsList: React.FC = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/news");
        const data: News[] = await res.json();
        setNews(data);
      } catch (err) {
        console.error("Ошибка при загрузке новостей:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p>Загрузка новостей...</p>;
  if (!news.length) return <p>Новостей пока нет.</p>;

  return (
    <div>
      {news.map((item) => (
        <div key={item.id} style={{ marginBottom: "20px", border: "1px solid #ccc", padding: "10px" }}>
          {item.photo && <img src={item.photo} alt={item.title} style={{ maxWidth: "100%" }} />}
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>
            <a href={item.link} target="_blank" rel="noopener noreferrer">Оригинальная новость</a>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NewsList;
