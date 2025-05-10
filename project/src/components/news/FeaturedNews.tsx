import { NewsArticle } from '@/types';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';
import { TrendingUp, MessageSquare, Eye } from 'lucide-react';
import { Badge } from '@/components/ui';

interface FeaturedNewsProps {
  article: NewsArticle;
}

const FeaturedNews: React.FC<FeaturedNewsProps> = ({ article }) => {
  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  return (
    <motion.div 
      className="relative rounded-xl overflow-hidden bg-card h-[400px] flex flex-col"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${article.imageUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      </div>
      
      <div className="relative z-10 flex-1 flex flex-col justify-end p-6 text-white">
        <Badge 
          className="mb-4 w-fit"
          variant="secondary"
        >
          {article.category}
        </Badge>
        
        <h2 className="text-3xl font-bold mb-3">{article.title}</h2>
        
        <p className="text-gray-200 mb-4 line-clamp-2">
          {article.summary}
        </p>
        
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center space-x-4 mb-2 sm:mb-0">
            <div className="text-sm text-gray-300">{article.source}</div>
            <div className="text-sm text-gray-300">By {article.author}</div>
            <div className="text-sm text-gray-300">{formattedDate}</div>
          </div>
          
          <div className="flex items-center space-x-4">
            {article.isTrending && (
              <div className="flex items-center text-amber-400">
                <TrendingUp className="h-4 w-4 mr-1" />
                <span className="text-sm">Trending</span>
              </div>
            )}
            
            <div className="flex items-center text-gray-300">
              <MessageSquare className="h-4 w-4 mr-1" />
              <span className="text-sm">{article.comments}</span>
            </div>
            
            <div className="flex items-center text-gray-300">
              <Eye className="h-4 w-4 mr-1" />
              <span className="text-sm">{article.views}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedNews;