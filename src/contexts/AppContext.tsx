import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NewsCategory } from '@/types';
import socketService from '@/services/socketService';
import { fetchNews, fetchTrending } from '@/store/slices/newsSlice';
import { setCategories } from '@/store/slices/subscriptionSlice';

interface AppContextType {
  isLoading: boolean;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  initializeSocket: () => void;
  subscribeToCategory: (category: NewsCategory) => void;
  unsubscribeFromCategory: (category: NewsCategory) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.subscriptions);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  const initializeSocket = () => {
    socketService.connect();
  };

  const subscribeToCategory = (category: NewsCategory) => {
    socketService.subscribeToCategory(category);
  };

  const unsubscribeFromCategory = (category: NewsCategory) => {
    socketService.unsubscribeFromCategory(category);
  };

  // Initialize app
  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      
      // Check if dark mode is preferred
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
      
      // Initialize socket connection
      initializeSocket();
      
      // Fetch initial news data
      await dispatch(fetchNews(categories));
      await dispatch(fetchTrending());
      
      // Set initial subscriptions
      categories.forEach(category => {
        subscribeToCategory(category);
      });
      
      // Load saved user preferences from localStorage if any
      const savedCategories = localStorage.getItem('newsCategories');
      if (savedCategories) {
        const parsedCategories = JSON.parse(savedCategories) as NewsCategory[];
        dispatch(setCategories(parsedCategories));
        parsedCategories.forEach(category => {
          subscribeToCategory(category);
        });
      }
      
      setIsLoading(false);
    };
    
    loadInitialData();
    
    // Cleanup on unmount
    return () => {
      socketService.disconnect();
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isDarkMode,
        toggleDarkMode,
        initializeSocket,
        subscribeToCategory,
        unsubscribeFromCategory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};