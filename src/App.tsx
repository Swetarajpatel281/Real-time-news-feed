import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { AppProvider } from '@/contexts/AppContext';
import RootLayout from '@/layouts/RootLayout';
import HomePage from '@/pages/HomePage';
// import Index from './layouts/Index';

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <AppProvider>
        <RootLayout>
          <HomePage />
          {/* <Index />  */}
        </RootLayout>
        <Toaster />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;