import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleSidebar, resetNotificationCount } from '@/store/slices/uiSlice';
import { NewsCategory } from '@/types';
import { setCurrentCategory } from '@/store/slices/uiSlice';
import { fetchNews } from '@/store/slices/newsSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
// import { Link } from 'react-router-dom';
import { 
  Bell, 
  Menu, 
  Search, 
  X, 
  Moon, 
  Sun,
  Globe,
} from 'lucide-react';
import { 
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Badge,
  Input
} from '@/components/ui';

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setTheme, theme } = useTheme();
  const { notificationCount } = useAppSelector((state) => state.ui);
  const { categories } = useAppSelector((state) => state.subscriptions);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);

  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  const handleCategorySelect = (category: NewsCategory | 'All') => {
    dispatch(setCurrentCategory(category));
    if (category === 'All') {
      dispatch(fetchNews(categories));
    } else {
      dispatch(fetchNews([category]));
    }
  };

  const handleNotificationClick = () => {
    dispatch(resetNotificationCount());
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-20 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleToggleSidebar}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <Globe className="h-6 w-6 mr-2 text-primary" />
              <h1 className="text-xl font-bold">NewsFlash</h1>
            </div>
          </div>

          <div className="hidden md:flex space-x-1">
            {['All', 'Technology', 'Business', 'Politics', 'Sports'].map((category) => (
              <Button
                key={category}
                variant="ghost"
                size="sm"
                onClick={() => handleCategorySelect(category as NewsCategory | 'All')}
                className="px-3 text-sm font-medium"
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="flex items-center space-x-2">
            <AnimatePresence>
              {searchOpen ? (
                <motion.form
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '200px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSearchSubmit}
                  className="relative"
                >
                  <Input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-8"
                    autoFocus
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.form>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchOpen(true)}
                >
                  <Search className="h-5 w-5" />
                </Button>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleNotificationClick}
              className="relative"
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <Badge
                  className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs"
                  variant="destructive"
                >
                  {notificationCount}
                </Badge>
              )}
            </Button>
             <Button 
             variant="ghost"
             
             >  
              Sign In
              </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                </Button>
               
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;