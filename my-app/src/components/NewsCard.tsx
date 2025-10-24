import React from "react";

interface NewsCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  author?: string;
  publishedAt: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, description, category, image, author, publishedAt }) => {
  return (
    <div className="news-card">
      {image && <img src={image} alt={title} />}
      <h3>{title}</h3>
      <p>{description}</p>
      <small>{category} | {author} | {new Date(publishedAt).toLocaleString()}</small>
    </div>
  );
};

export default NewsCard;
export {};
