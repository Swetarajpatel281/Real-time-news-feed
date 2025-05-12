import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import RootLayout from './RootLayout';
import SignIn from '../components/ui/custom/LoginPage';
import SignUp from '../components/ui/custom/SignupPage';
import HomePage from '@/pages/HomePage';
// import Dashboard from './pages/Dashboard';

const AppRoutes = () => {
  const location = useLocation();
  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  return isAuthPage ? (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  ) : (
    <RootLayout>
      <Routes>
        <Route path="/"  element={<HomePage/>}/>
        {/* Add more protected routes here */}
      </Routes>
    </RootLayout>
  );
};

const Index = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default Index;
