import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Trophy, User, QrCode } from 'lucide-react';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="font-bold text-xl text-indigo-600">QuestVault</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
                <Link to="/quests/new" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  New Quest
                </Link>
                <Link to="/achievements/new" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <Trophy className="w-4 h-4 mr-2" />
                  New Achievement
                </Link>
                <Link to="/profile" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </Link>
                <Link to="/tools" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  <QrCode className="w-4 h-4 mr-2" />
                  Tools
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        <div className="sm:hidden flex justify-around py-2 border-t border-gray-200">
            <Link to="/" className="p-2 text-gray-500"><LayoutDashboard /></Link>
            <Link to="/quests/new" className="p-2 text-gray-500"><PlusCircle /></Link>
            <Link to="/achievements/new" className="p-2 text-gray-500"><Trophy /></Link>
            <Link to="/profile" className="p-2 text-gray-500"><User /></Link>
            <Link to="/tools" className="p-2 text-gray-500"><QrCode /></Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
