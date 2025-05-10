import { NewsArticle } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';
import { TrendingUp, MessageSquare, Eye, Bookmark, BookmarkCheck } from 'lucide-react';
import { 
  Card, 
  CardContent, 
  CardFooter,
  Badge,
  Button,
  toast
} from '@/components/ui';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { saveArticle, removeSavedArticle } from '@/store/slices/newsSlice';

interface NewsCardProps {
  article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const dispatch = useAppDispatch();
  const savedArticles = useAppSelector(state => state.news.savedArticles);
  const isSaved = savedArticles.some(saved => saved.id === article.id);

  const formattedDate = formatDistanceToNow(new Date(article.publishedAt), {
    addSuffix: true,
  });

  const handleSaveToggle = async () => {
    if (isSaved) {
      await dispatch(removeSavedArticle(article.id));
      toast.success('Article removed from saved items');
    } else {
      await dispatch(saveArticle(article));
      toast.success('Article saved successfully');
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full overflow-hidden flex flex-col">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <div className="absolute top-2 left-2">
            <Badge variant="secondary">
              {article.category}
            </Badge>
          </div>
          {article.isTrending && (
            <div className="absolute top-2 right-2">
              <Badge variant="default" className="bg-amber-500 hover:bg-amber-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            </div>
          )}
        </div>
        
        <CardContent className="flex-1 pt-4">
          <div className="text-sm text-muted-foreground mb-2 flex items-center justify-between">
            <span>{article.source}</span>
            <span>{formattedDate}</span>
          </div>
          
          <h3 className="font-bold text-lg mb-2 line-clamp-2">
            {article.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">
            {article.summary}
          </p>
        </CardContent>
        
        <CardFooter className="border-t pt-3 text-muted-foreground">
          <div className="flex items-center justify-between w-full">
            <span className="text-sm">By {article.author}</span>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="text-xs">{article.comments}</span>
              </div>
              
              <div className="flex items-center">
                <Eye className="h-3 w-3 mr-1" />
                <span className="text-xs">{article.views}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleSaveToggle}
                className="ml-2"
              >
                {isSaved ? (
                  <BookmarkCheck className="h-4 w-4 text-green-500" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default NewsCard;