import React, { useState } from 'react';
import { Activity, LogOut, User, Menu, X, Calendar } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { useNavigate, Link, useLocation } from 'react-router-dom';

export function Header() {
  const { signOut } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: '/', label: 'Dashboard', icon: null },
    { path: '/logs', label: 'Logs History', icon: Calendar },
    { path: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <Activity className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-900">WeightLossify</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-4 py-2 text-sm font-medium ${
                  isActive(path) ? 'text-indigo-600' : 'text-gray-700 hover:text-indigo-600'
                }`}
              >
                {Icon && <Icon className="h-5 w-5" />}
                <span>{label}</span>
              </Link>
            ))}
            <button 
              onClick={handleSignOut}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-indigo-600"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-2 border-t border-gray-200">
            <div className="space-y-1">
              {navItems.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 text-base font-medium rounded-md ${
                    isActive(path)
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="h-5 w-5" />}
                  <span>{label}</span>
                </Link>
              ))}
              <button 
                onClick={() => {
                  setIsMenuOpen(false);
                  handleSignOut();
                }}
                className="w-full flex items-center space-x-2 px-4 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md"
              >
                <LogOut className="h-5 w-5" />
                <span>Sign Out</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}