export interface News {
  id: number;
  title: string;
  description: string;
  link: string;
  date: string;
}
export interface NewsResponse {
  news: News[];
}