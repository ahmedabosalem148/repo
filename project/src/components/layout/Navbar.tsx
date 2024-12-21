import React, { useState } from 'react';
import { Menu, X, ShoppingBag, User } from 'lucide-react';
import { useSelector } from 'react-redux';
import { CartIcon } from '../cart/CartIcon';
import { LoginModal } from '../auth/LoginModal';
import type { RootState } from '../../store';

interface NavbarProps {
  onCartClick: () => void;
}

export function Navbar({ onCartClick }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">FurnishPro</span>
          </div>
          
          <div className="hidden sm:flex sm:items-center sm:space-x-8">
            <a href="/" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Home
            </a>
            <a href="/bundles" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Bundles
            </a>
            <a href="/about" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              About
            </a>
            <a href="/contact" className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md">
              Contact
            </a>
            {isAuthenticated ? (
              <span className="text-gray-700">Welcome, {user?.name}</span>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <User className="h-4 w-4 mr-2" />
                Login
              </button>
            )}
            <button
              onClick={onCartClick}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600"
            >
              <CartIcon />
            </button>
          </div>

          <div className="sm:hidden flex items-center space-x-4">
            <button
              onClick={onCartClick}
              className="p-2 rounded-md text-gray-700 hover:text-indigo-600"
            >
              <CartIcon />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a href="/" className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              Home
            </a>
            <a href="/bundles" className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              Bundles
            </a>
            <a href="/about" className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              About
            </a>
            <a href="/contact" className="block px-3 py-2 rounded-md text-gray-700 hover:text-indigo-600">
              Contact
            </a>
            {isAuthenticated ? (
              <span className="block px-3 py-2 text-gray-700">Welcome, {user?.name}</span>
            ) : (
              <button
                onClick={() => setIsLoginOpen(true)}
                className="w-full text-left px-3 py-2 text-gray-700 hover:text-indigo-600"
              >
                Login
              </button>
            )}
          </div>
        </div>
      )}

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </nav>
  );
}