export interface News {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  author?: string;
  source: 'manual' | 'rss';
  publishedAt: string;
}
