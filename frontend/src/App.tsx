
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import LandingPage from './pages/LandingPage';
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import SearchResultsPage from './pages/SearchResultsPage';
import WishlistPage from './pages/WishlistPage';
import HelpCenterPage from './pages/HelpCenterPage';
import DashboardPage from './pages/DashboardPage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import MessagesPage from './pages/MessagesPage';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <WishlistProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/properties/:id" element={<PropertyDetailsPage />} />
              <Route path="/book/:propertyId" element={<CheckoutPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/:tab" element={<DashboardPage />} />
              <Route path="/dashboard/messages" element={<MessagesPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/search" element={<SearchResultsPage />} />
              <Route path="/help-center" element={<HelpCenterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/how-it-works" element={<HowItWorksPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;


