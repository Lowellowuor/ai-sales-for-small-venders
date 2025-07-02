import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Mic, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [language, setLanguage] = useState('EN');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Demo', path: '/demo' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Success Stories', path: '/success-stories' },
    { name: 'Resources', path: '/resources' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'EN' ? 'SW' : 'EN');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-lg shadow-lg border-b border-gray-200 dark:border-dark-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              PitchPoa AI
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative font-medium transition-colors hover:text-primary-600 dark:hover:text-primary-400 ${
                  location.pathname === item.path 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : scrolled 
                      ? 'text-gray-700 dark:text-gray-300' 
                      : 'text-white'
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-500"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Theme Toggle, Language Toggle & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            <button
              onClick={toggleLanguage}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg transition-colors ${
                scrolled 
                  ? 'hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300' 
                  : 'hover:bg-white/20 text-white'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">{language}</span>
            </button>
            
            <Link
              to="/demo"
              className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Free Trial
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${
              scrolled ? 'text-gray-700 dark:text-gray-300' : 'text-white'
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-dark-900 border-t border-gray-200 dark:border-dark-700"
          >
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`block py-2 font-medium transition-colors ${
                    location.pathname === item.path 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                <div className="flex items-center space-x-3">
                  <ThemeToggle />
                  <button
                    onClick={toggleLanguage}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-800 text-gray-700 dark:text-gray-300"
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-medium">{language}</span>
                  </button>
                </div>
                <Link
                  to="/demo"
                  className="bg-gradient-to-r from-primary-500 to-accent-500 text-white px-6 py-2 rounded-lg font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  Start Free Trial
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;