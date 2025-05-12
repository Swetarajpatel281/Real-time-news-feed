import { NewsArticle } from '@/types';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, ExternalLink } from 'lucide-react';
import { 
  Card, 
  CardContent,
  Badge
} from '@/components/ui';

interface TrendingNewsProps {
  articles: NewsArticle[];
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ articles }) => {
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {articles.map((article, index) => (
        <motion.div 
          key={article.id}
          variants={item}
          className={index === 0 ? "lg:col-span-2" : ""}
        >
          <Card className="overflow-hidden h-full flex flex-col">
            <div 
              className="h-32 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${article.imageUrl})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <Badge variant="secondary" className="m-2">
                  {article.category}
                </Badge>
              </div>
            </div>
            
            <CardContent className="flex-1 p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center text-amber-500">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  <span className="text-xs font-medium">Trending</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
                </span>
              </div>
              
              <h3 className="font-bold text-sm line-clamp-2 mb-2">
                {article.title}
              </h3>
              
              {index === 0 && (
                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                  {article.summary}
                </p>
              )}
              
              <div className="flex justify-between items-center mt-auto">
                <span className="text-xs text-muted-foreground">{article.source}</span>
                <ExternalLink className="h-3 w-3 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default TrendingNews;