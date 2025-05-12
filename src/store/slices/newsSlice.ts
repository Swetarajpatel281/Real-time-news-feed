import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NewsArticle, NewsCategory } from '@/types';
import { fetchLatestNews, fetchTrendingNews } from '@/services/newsService';
import localforage from 'localforage';

interface NewsState {
  articles: NewsArticle[];
  trendingArticles: NewsArticle[];
  savedArticles: NewsArticle[];
  featuredArticle: NewsArticle | null;
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  articles: [],
  trendingArticles: [],
  savedArticles: [],
  featuredArticle: null,
  loading: false,
  error: null,
};

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (categories: NewsCategory[]) => {
    return await fetchLatestNews(categories);
  }
);

export const fetchTrending = createAsyncThunk(
  'news/fetchTrending',
  async () => {
    return await fetchTrendingNews();
  }
);

export const loadSavedArticles = createAsyncThunk(
  'news/loadSavedArticles',
  async () => {
    const saved = await localforage.getItem<NewsArticle[]>('savedArticles');
    return saved || [];
  }
);

export const saveArticle = createAsyncThunk(
  'news/saveArticle',
  async (article: NewsArticle) => {
    const saved = await localforage.getItem<NewsArticle[]>('savedArticles') || [];
    const updatedSaved = [...saved, article];
    await localforage.setItem('savedArticles', updatedSaved);
    return article;
  }
);

export const removeSavedArticle = createAsyncThunk(
  'news/removeSavedArticle',
  async (articleId: string) => {
    const saved = await localforage.getItem<NewsArticle[]>('savedArticles') || [];
    const updatedSaved = saved.filter(article => article.id !== articleId);
    await localforage.setItem('savedArticles', updatedSaved);
    return articleId;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      state.articles = action.payload;
    },
    addArticle: (state, action: PayloadAction<NewsArticle>) => {
      state.articles.unshift(action.payload);
    },
    setFeaturedArticle: (state, action: PayloadAction<NewsArticle>) => {
      state.featuredArticle = action.payload;
    },
    setTrendingArticles: (state, action: PayloadAction<NewsArticle[]>) => {
      state.trendingArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload;
        if (action.payload.length > 0) {
          state.featuredArticle = action.payload[0];
        }
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch news';
      })
      .addCase(fetchTrending.fulfilled, (state, action) => {
        state.trendingArticles = action.payload;
      })
      .addCase(loadSavedArticles.fulfilled, (state, action) => {
        state.savedArticles = action.payload;
      })
      .addCase(saveArticle.fulfilled, (state, action) => {
        state.savedArticles.push(action.payload);
      })
      .addCase(removeSavedArticle.fulfilled, (state, action) => {
        state.savedArticles = state.savedArticles.filter(
          article => article.id !== action.payload
        );
      });
  },
});

export const { setArticles, addArticle, setFeaturedArticle, setTrendingArticles } = newsSlice.actions;

export default newsSlice.reducer;