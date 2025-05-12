import { useState, useEffect } from 'react';
import { useAppSelector } from '@/store/hooks';
import Navbar from '@/components/ui/custom/Navbar';
import Sidebar from '@/components/ui/custom/Sidebar';
import Footer from '@/components/ui/custom/Footer';
import { AnimatePresence, motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
// import Header from '@/components/ui/custom/Header';

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const { sidebarOpen } = useAppSelector((state) => state.ui);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Loader2 className="h-16 w-16 text-primary animate-spin mb-4" />
          <h1 className="text-2xl font-bold text-primary">Loading NewsFlash</h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed md:relative z-30 h-full"
          >
            <Sidebar />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto pb-10 px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-screen-2xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default RootLayout;