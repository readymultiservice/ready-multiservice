import React, { useState, useEffect } from 'react';

interface HeaderProps {
  isLoggedIn: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
}

const Logo: React.FC = () => (
  <a href="#" className="flex items-center space-x-2">
    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
    <span className="text-2xl font-bold text-gray-800">ReadyMultiService</span>
  </a>
);

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLoginClick, onRegisterClick, onProfileClick, onLogout }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#about', label: 'About' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#contact', label: 'Contact' },
  ];

  const navLinkClasses = `text-lg font-semibold transition-colors duration-300 hover:text-red-600`;
  const stickyLinkColor = 'text-gray-700';
  const transparentLinkColor = 'text-white';

  const AuthButtons: React.FC<{isMobile?: boolean}> = ({ isMobile = false }) => (
    <div className={`flex items-center ${isMobile ? 'flex-col space-y-4' : 'space-x-4'}`}>
      {isLoggedIn ? (
        <>
          <button onClick={onProfileClick} className={`${navLinkClasses} ${isMobile || isSticky ? stickyLinkColor : transparentLinkColor}`}>Profile</button>
          <button onClick={onLogout} className={`bg-gray-200 text-gray-800 hover:bg-gray-300 font-bold py-2 px-6 rounded-md transition-colors`}>
            Logout
          </button>
        </>
      ) : (
        <>
          <button onClick={onLoginClick} className={`${navLinkClasses} ${isMobile || isSticky ? stickyLinkColor : transparentLinkColor}`}>Login</button>
          <button onClick={onRegisterClick} className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-md transition-transform duration-300 transform hover:scale-105`}>
            Register
          </button>
        </>
      )}
    </div>
  );

  return (
    <header className={`w-full z-50 transition-all duration-300 ${isSticky ? 'fixed top-0 bg-white shadow-md' : 'absolute top-0 bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={`${navLinkClasses} ${isSticky ? stickyLinkColor : transparentLinkColor}`}>
                {link.label}
              </a>
            ))}
            <div className="w-px h-6 bg-gray-300"></div>
            <AuthButtons />
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`${isSticky ? stickyLinkColor : transparentLinkColor}`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-4">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className={`text-lg font-semibold text-gray-700 hover:text-red-600 transition-colors duration-300`}>
                {link.label}
              </a>
            ))}
             <div className="w-full border-t border-gray-200 my-2"></div>
             <AuthButtons isMobile={true}/>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;