import { Clock } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ArticleCardProps {
  title: string;
  description: string;
  category: string;
  image: string;
  author: string;
  time: string;
}

export function ArticleCard({ title, description, category, image, author, time }: ArticleCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg dark:hover:shadow-blue-900/20 transition-shadow cursor-pointer group dark:bg-gray-800 dark:border-gray-700">
      <div className="aspect-video overflow-hidden">
        <ImageWithFallback 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <Badge className="mb-2" variant="secondary">{category}</Badge>
        <h3 className="mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
        <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400">
          <span>{author}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {time}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
