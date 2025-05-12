import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NewsCategory } from '@/types';
import { subscribe, unsubscribe } from '@/store/slices/subscriptionSlice';
import { setCurrentCategory, setSidebarOpen } from '@/store/slices/uiSlice';
import { fetchNews } from '@/store/slices/newsSlice';
import { useApp } from '@/contexts/AppContext';
import { motion } from 'framer-motion';
// import SettingsPage from '@/components/settings/SettingPage';
import { 
  X, 
  BookOpen, 
  Settings, 
  LogOut, 
  User, 
  CheckSquare,
  Square,
  Home,
  TrendingUp,
  Zap,
  Newspaper,
  Bookmark
} from 'lucide-react';
import { 
  Button,
  Separator
} from '@/components/ui';

const categories: NewsCategory[] = [
  'Technology',
  'Business',
  'Politics',
  'Sports',
  'Science',
  'Health',
  'Entertainment'
];

const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { subscribeToCategory, unsubscribeFromCategory } = useApp();
  const { categories: subscribedCategories } = useAppSelector(
    (state) => state.subscriptions
  );
  const { currentCategory } = useAppSelector((state) => state.ui);

  const handleToggleCategory = (category: NewsCategory) => {
    if (subscribedCategories.includes(category)) {
      dispatch(unsubscribe(category));
      unsubscribeFromCategory(category);
    } else {
      dispatch(subscribe(category));
      subscribeToCategory(category);
    }
  };

  const handleCategorySelect = (category: NewsCategory | 'All') => {
    dispatch(setCurrentCategory(category));
    
    if (category === 'All') {
      dispatch(fetchNews(subscribedCategories));
    } else {
      dispatch(fetchNews([category]));
    }
    
    // Close sidebar on mobile
    if (window.innerWidth < 768) {
      dispatch(setSidebarOpen(false));
    }
  };

  return (
    <div className="bg-card h-full w-64 shadow-lg flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold flex items-center">
          <Newspaper className="mr-2 h-5 w-5" />
          NewsFlash
        </h2>
        <Button variant="ghost" size="icon" onClick={() => dispatch(setSidebarOpen(false))}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
            Navigation
          </h3>
          <div className="space-y-1">
            <Button
              variant={currentCategory === 'All' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => handleCategorySelect('All')}
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Zap className="mr-2 h-4 w-4" />
              Latest
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start"
            >
              <Bookmark className="mr-2 h-4 w-4" />
              Saved
            </Button>
          </div>
        </div>

        <Separator className="my-2" />

        <div className="px-3 py-2">
          <h3 className="mb-2 px-4 text-sm font-semibold text-muted-foreground">
            Subscriptions
          </h3>
          <div className="space-y-1">
            {categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ x: 5 }}
                className="flex items-center"
              >
                <Button
                  variant={currentCategory === category ? 'secondary' : 'ghost'}
                  className="flex-1 justify-start"
                  onClick={() => handleCategorySelect(category)}
                >
                  <BookOpen className="mr-2 h-4 w-4" />
                  {category}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToggleCategory(category)}
                  className="h-8 w-8"
                >
                  {subscribedCategories.includes(category) ? (
                    <CheckSquare className="h-4 w-4 text-primary" />
                  ) : (
                    <Square className="h-4 w-4" />
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 border-t">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-medium">Sweta raj patel</p>
            <p className="text-xs text-muted-foreground">sweta@example.com</p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Settings className="mr-2 h-4 w-4" />
            {/* <SettingsPage/> */}
            Settings
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;