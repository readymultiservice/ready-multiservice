import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import AboutUs from './components/AboutUs';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AuthModal from './components/AuthModal';
import UserDashboard from './components/UserDashboard';
import type { ThemeColors } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin' | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  
  // Static theme for consistency and performance
  const currentTheme: ThemeColors = {
    primary: 'red-600',
    primaryHover: 'red-700',
    accent: 'red-100',
    text: 'text-red-600',
    border: 'border-red-600',
    ring: 'focus:ring-red-500',
  };

  const handleLoginClick = () => {
    setAuthMode('login');
    setShowAuthModal(true);
  };
  
  const handleRegisterClick = () => {
    setAuthMode('register');
    setShowAuthModal(true);
  };
  
  const handleLogin = (role: 'user' | 'admin') => {
    setIsLoggedIn(true);
    setUserRole(role);
    setShowAuthModal(false);
    if (role === 'user') {
      setShowUserDashboard(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setShowUserDashboard(false);
  };

  const handleProfileClick = () => {
    if (userRole === 'user') {
      setShowUserDashboard(true);
    }
  };

  if (isLoggedIn && userRole === 'admin') {
    return <AdminPanel onLogout={handleLogout} themeColors={currentTheme} />;
  }

  return (
    <div className="bg-white text-gray-800">
      <Header 
        isLoggedIn={isLoggedIn}
        onLoginClick={handleLoginClick}
        onRegisterClick={handleRegisterClick}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
      />
      <main>
        <Hero />
        <Services />
        <AboutUs />
        <Portfolio />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onLogin={handleLogin} 
          onClose={() => setShowAuthModal(false)}
          // FIX: Pass `setAuthMode` state setter to the `setMode` prop.
          setMode={setAuthMode}
        />
      )}
      {isLoggedIn && userRole === 'user' && showUserDashboard && (
        <UserDashboard onLogout={handleLogout} onExit={() => setShowUserDashboard(false)} />
      )}
    </div>
  );
};

export default App;
