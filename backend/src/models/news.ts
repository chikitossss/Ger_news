export interface News {
  id: number;
  title: string;
  content: string; // добавляем поле content
  description: string;
  link: string;
  date: string;
}
export interface NewsResponse {
  news: News[];
}