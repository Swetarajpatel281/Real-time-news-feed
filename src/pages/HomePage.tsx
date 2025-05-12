import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchNews, fetchTrending, loadSavedArticles } from '@/store/slices/newsSlice';
import { motion } from 'framer-motion';
import FeaturedNews from '@/components/news/FeaturedNews';
import NewsGrid from '@/components/news/NewsGrid';
import TrendingNews from '@/components/news/TrendingNews';
import ThreeDimensionalGlobe from '@/components/three/ThreeDimensionalGlobe';
import { Skeleton } from '@/components/ui';
import InfiniteScroll from 'react-infinite-scroll-component';

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { articles, trendingArticles, loading } = useAppSelector((state) => state.news);
  const { categories } = useAppSelector((state) => state.subscriptions);
  const { currentCategory } = useAppSelector((state) => state.ui);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadSavedArticles());
      await dispatch(fetchNews(categories));
      await dispatch(fetchTrending());
    };
    
    loadData();
  }, [dispatch, categories]);

  const filteredArticles = currentCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === currentCategory);

  if (loading && articles.length === 0) {
    return (
      <div className="container py-8">
        <Skeleton className="h-[300px] w-full rounded-xl mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
          <Skeleton className="h-[200px] rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[320px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {articles.length > 0 && (
            <FeaturedNews article={articles[0]} />
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="h-[300px] lg:h-auto"
        >
          <ThreeDimensionalGlobe articles={articles} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
          {currentCategory === 'All' ? 'Latest News' : `${currentCategory} News`}
        </h2>
        <InfiniteScroll
          dataLength={filteredArticles.length}
          next={() => dispatch(fetchNews(categories))}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          <NewsGrid articles={filteredArticles} />
        </InfiniteScroll>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">Trending Now</h2>
        <TrendingNews articles={trendingArticles} />
      </motion.div>
    </div>
  );
};

export default HomePage;