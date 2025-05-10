export type NewsCategory = 
  | 'Technology' 
  | 'Business' 
  | 'Sports' 
  | 'Entertainment' 
  | 'Politics' 
  | 'Science' 
  | 'Health';

export interface NewsArticle {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: NewsCategory;
  author: string;
  source: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  likes: number;
  comments: number;
  views: number;
  isTrending: boolean;
  location?: {
    country: string;
    coordinates: [number, number]; // [longitude, latitude]
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  subscriptions: NewsCategory[];
  avatar?: string;
}

export interface Comment {
  id: string;
  articleId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
  likes: number;
}