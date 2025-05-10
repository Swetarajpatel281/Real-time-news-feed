import { NewsArticle, NewsCategory } from '@/types';
import { mockNewsData } from '@/data/mockNewsData';

// Simulate API calls with mock data
export const fetchLatestNews = async (
  categories: NewsCategory[] = []
): Promise<NewsArticle[]> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  // Filter by categories if provided, otherwise return all
  if (categories.length === 0) {
    return mockNewsData;
  }
  
  return mockNewsData.filter((article) => 
    categories.includes(article.category)
  );
};

export const fetchTrendingNews = async (): Promise<NewsArticle[]> => {
  await new Promise((resolve) => setTimeout(resolve, 700));
  
  // Simulate a MongoDB aggregation pipeline that sorts by views and likes
  return mockNewsData
    .filter((article) => article.isTrending)
    .sort((a, b) => (b.views + b.likes * 2) - (a.views + a.likes * 2))
    .slice(0, 5);
};

export const fetchArticleById = async (id: string): Promise<NewsArticle | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockNewsData.find((article) => article.id === id);
};

export const fetchArticlesByCategory = async (
  category: NewsCategory
): Promise<NewsArticle[]> => {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return mockNewsData.filter((article) => article.category === category);
};

export const searchArticles = async (query: string): Promise<NewsArticle[]> => {
  await new Promise((resolve) => setTimeout(resolve, 600));
  
  const lowercaseQuery = query.toLowerCase();
  return mockNewsData.filter(
    (article) =>
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.content.toLowerCase().includes(lowercaseQuery) ||
      article.summary.toLowerCase().includes(lowercaseQuery)
  );
};