import { Clock } from 'lucide-react';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface FeaturedArticleProps {
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  time: string;
}

export function FeaturedArticle({ title, description, category, image, author, time }: FeaturedArticleProps) {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-900 dark:bg-gray-950 text-white h-[500px] group cursor-pointer">
      <ImageWithFallback 
        src={image} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-70 dark:opacity-60 group-hover:opacity-60 dark:group-hover:opacity-50 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent dark:from-black/90 dark:via-black/50"></div>
      <div className="absolute bottom-0 left-0 right-0 p-8">
        <Badge className="mb-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">{category}</Badge>
        <h1 className="mb-4 max-w-3xl group-hover:text-blue-400 dark:group-hover:text-blue-300 transition-colors">{title}</h1>
        <p className="mb-4 max-w-2xl text-gray-200 dark:text-gray-300">{description}</p>
        <div className="flex items-center gap-4 text-gray-300 dark:text-gray-400">
          <span>By {author}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {time}
          </span>
        </div>
      </div>
    </div>
  );
}
