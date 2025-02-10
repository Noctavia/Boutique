import React from 'react';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onSearchChange: (query: string) => void;
  onCartClick: () => void;
}

export default function Navbar({ cartCount, onSearchChange, onCartClick }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Menu className="h-6 w-6 text-gray-600 cursor-pointer" />
            <span className="ml-4 text-xl font-bold text-gray-800">BoutiqueModerne</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Accueil</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Produits</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Catégories</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">Contact</a>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              {isSearchOpen ? (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="ml-2 text-gray-600 hover:text-gray-900"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Search
                  className="h-6 w-6 text-gray-600 cursor-pointer"
                  onClick={() => setIsSearchOpen(true)}
                />
              )}
            </div>
            <div className="relative cursor-pointer" onClick={onCartClick}>
              <ShoppingCart className="h-6 w-6 text-gray-600" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
