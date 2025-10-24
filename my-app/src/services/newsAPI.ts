export const getNews = async () => {
  const res = await fetch("http://localhost:5000/api/news");
  if (!res.ok) throw new Error("Failed to fetch news");
  return res.json();
};
