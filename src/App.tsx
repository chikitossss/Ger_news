import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { FeaturedArticle } from './components/FeaturedArticle';
import { ArticleCard } from './components/ArticleCard';
import { Tabs, TabsList, TabsTrigger } from './components/ui/tabs';
import { ThemeProvider } from './components/ThemeProvider';

const categories = ['All', 'Technology', 'Business', 'Sports', 'Science', 'Entertainment', 'Health'];

const featuredArticle = {
  title: 'Global Leaders Convene for Historic Climate Summit',
  description: 'World leaders gather in unprecedented numbers to discuss actionable climate solutions and commit to carbon neutrality targets.',
  category: 'Breaking News',
  image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
  author: 'Sarah Mitchell',
  time: '2 hours ago'
};

interface News {
  id: number;
  title: string;
  description: string;
  category: string;
  image?: string;
  link: string;
  author: string;
  time: string;
}

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [serverArticles, setServerArticles] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  // Подгрузка новостей с бекенда
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/news");
        const data: News[] = await res.json();
        setServerArticles(data);
      } catch (err) {
        console.error("Ошибка при загрузке новостей:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const filteredArticles = selectedCategory === 'All' 
    ? serverArticles 
    : serverArticles.filter(article => article.category === selectedCategory);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
        <Header />

        <main className="container mx-auto px-4 py-8">
          {/* Featured Article */}
          <section className="mb-12">
            <FeaturedArticle {...featuredArticle} />
          </section>

          {/* Category Tabs */}
          <section className="mb-8">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
              <TabsList className="w-full justify-start overflow-x-auto flex-wrap h-auto gap-2 bg-transparent p-0">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category} 
                    value={category}
                    className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-500"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </section>

          {/* Articles Grid */}
          <section>
            {loading ? (
              <p>Загрузка новостей...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {filteredArticles.map((article) => (
  <ArticleCard
    key={article.id}
    {...article}
    image={article.image || "https://via.placeholder.com/600x400"} // подставляем заглушку, если нет картинки
  />
))}

              </div>
            )}
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 dark:bg-black text-white mt-16 border-t dark:border-gray-800">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded"></div>
                  <span>NewsHub</span>
                </div>
                <p className="text-gray-400 dark:text-gray-500">Your trusted source for breaking news and in-depth coverage.</p>
              </div>
              <div>
                <h4 className="mb-4">Categories</h4>
                <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">World</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Politics</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Business</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Technology</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Contact</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Privacy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4">Follow Us</h4>
                <ul className="space-y-2 text-gray-400 dark:text-gray-500">
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Twitter</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Facebook</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white dark:hover:text-gray-300 transition-colors">LinkedIn</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
              <p>&copy; 2025 NewsHub. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  );
}
