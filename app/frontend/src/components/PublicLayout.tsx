import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Moon, Sun, LogIn, LayoutDashboard, PlusCircle, Trophy, User, LogOut } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const PublicLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-dcc-dark text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <nav className="bg-white dark:bg-dcc-card shadow-md border-b dark:border-dcc-system/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="font-black text-xl text-orange-600 dark:text-dcc-system tracking-wider uppercase">
                    EudaimonAI <span className="text-xs align-top opacity-70">PUB</span>
                </Link>
              </div>
              {user && (
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link to="/" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-dcc-system hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Dashboard
                  </Link>
                  <Link to="/quests/new" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-dcc-system hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    New Quest
                  </Link>
                  <Link to="/achievements/new" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-dcc-system hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                    <Trophy className="w-4 h-4 mr-2" />
                    New Achievement
                  </Link>
                  <Link to="/profile" className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 dark:hover:border-dcc-system hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Link>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={toggleTheme}
                    className="p-2 rounded-full text-gray-500 dark:text-dcc-system hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                    title="Toggle Theme"
                >
                    {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
                {user ? (
                  <button 
                      onClick={logout}
                      className="p-2 rounded-full text-gray-500 dark:text-dcc-system hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      title="Logout"
                  >
                      <LogOut className="w-5 h-5" />
                  </button>
                ) : (
                  <Link 
                      to="/login"
                      className="p-2 rounded-full text-gray-500 dark:text-dcc-system hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none flex items-center gap-2"
                      title="Login"
                  >
                      <span className="text-sm font-medium hidden sm:block">Login</span>
                      <LogIn className="w-5 h-5" />
                  </Link>
                )}
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {user && (
          <div className="sm:hidden flex justify-around py-2 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-dcc-card">
              <Link to="/" className="p-2 text-gray-500 dark:text-gray-400"><LayoutDashboard /></Link>
              <Link to="/quests/new" className="p-2 text-gray-500 dark:text-gray-400"><PlusCircle /></Link>
              <Link to="/achievements/new" className="p-2 text-gray-500 dark:text-gray-400"><Trophy /></Link>
              <Link to="/profile" className="p-2 text-gray-500 dark:text-gray-400"><User /></Link>
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
