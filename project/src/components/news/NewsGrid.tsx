import { NewsArticle } from '@/types';
import NewsCard from './NewsCard';
import { motion } from 'framer-motion';

interface NewsGridProps {
  articles: NewsArticle[];
}

const NewsGrid: React.FC<NewsGridProps> = ({ articles }) => {
  // Skip the first article as it's used in the featured section
  const gridArticles = articles.slice(1, 7);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {gridArticles.map((article) => (
        <motion.div key={article.id} variants={item}>
          <NewsCard article={article} />
        </motion.div>
      ))}

      {gridArticles.length === 0 && (
        <div className="col-span-full text-center p-12">
          <h3 className="text-xl font-medium text-muted-foreground">
            No articles found for this category
          </h3>
          <p className="mt-2">
            Try subscribing to more categories or check back later
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default NewsGrid;