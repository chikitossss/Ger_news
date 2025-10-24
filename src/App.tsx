import { useState } from 'react';
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
  image: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmVha2luZyUyMG5ld3N8ZW58MXx8fHwxNzYxMjg4MzYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  author: 'Sarah Mitchell',
  time: '2 hours ago'
};

const articles = [
  {
    id: 1,
    title: 'Revolutionary AI System Transforms Medical Diagnostics',
    description: 'New artificial intelligence platform achieves 99% accuracy in early disease detection, promising to save millions of lives.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjEyMzQ5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'David Chen',
    time: '3 hours ago'
  },
  {
    id: 2,
    title: 'Stock Markets Reach Record Highs Amid Economic Recovery',
    description: 'Major indices post gains as investors show renewed confidence in global economic outlook and corporate earnings.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYxMjk2NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Emily Rodriguez',
    time: '5 hours ago'
  },
  {
    id: 3,
    title: 'Championship Final: Underdog Team Claims Victory',
    description: 'In a stunning upset, the third-seeded team defeats defending champions in a nail-biting overtime finish.',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1565483276060-e6730c0cc6a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBzdGFkaXVtfGVufDF8fHx8MTc2MTIxMzM1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Marcus Johnson',
    time: '6 hours ago'
  },
  {
    id: 4,
    title: 'Scientists Discover Groundbreaking Cancer Treatment',
    description: 'Breakthrough research unveils targeted therapy with minimal side effects, offering hope to millions of patients worldwide.',
    category: 'Science',
    image: 'https://images.unsplash.com/photo-1614934273187-c83f8780fad9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2llbmNlJTIwbGFib3JhdG9yeXxlbnwxfHx8fDE3NjEzMTY0OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Lisa Wang',
    time: '8 hours ago'
  },
  {
    id: 5,
    title: 'Explore the Hidden Gems of Southeast Asia',
    description: 'Travel experts reveal the most stunning and underrated destinations that should be on every adventurer\'s bucket list.',
    category: 'Travel',
    image: 'https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMHRyYXZlbHxlbnwxfHx8fDE3NjEzMjkyNDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Amanda Foster',
    time: '10 hours ago'
  },
  {
    id: 6,
    title: 'Music Festival Announces Star-Studded Lineup',
    description: 'Organizers confirm biggest names in music for summer\'s most anticipated festival, tickets selling out in minutes.',
    category: 'Entertainment',
    image: 'https://images.unsplash.com/photo-1566150951155-4a59643d8a9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRlcnRhaW5tZW50JTIwY29uY2VydHxlbnwxfHx8fDE3NjEyNDUyMjJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'James Martinez',
    time: '12 hours ago'
  },
  {
    id: 7,
    title: 'New Study Reveals Benefits of Mediterranean Diet',
    description: 'Research confirms significant health advantages of traditional Mediterranean eating patterns for longevity and wellbeing.',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1535914254981-b5012eebbd15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjEyODk0NTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Dr. Rachel Green',
    time: '14 hours ago'
  },
  {
    id: 8,
    title: 'Tech Giants Announce Major Sustainability Initiative',
    description: 'Leading technology companies commit to carbon-neutral operations by 2030, investing billions in renewable energy.',
    category: 'Technology',
    image: 'https://images.unsplash.com/photo-1568952433726-3896e3881c65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwaW5ub3ZhdGlvbnxlbnwxfHx8fDE3NjEyMzQ5MjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Alex Thompson',
    time: '16 hours ago'
  },
  {
    id: 9,
    title: 'Small Business Boom: Entrepreneurship on the Rise',
    description: 'Record numbers of new businesses launched this quarter as innovative startups reshape the economic landscape.',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmd8ZW58MXx8fHwxNzYxMjk2NTg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    author: 'Nina Patel',
    time: '18 hours ago'
  }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <ArticleCard key={article.id} {...article} />
              ))}
            </div>
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
