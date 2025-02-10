import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock < 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        {(isLowStock || isOutOfStock) && (
          <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-semibold ${
            isOutOfStock ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
          }`}>
            <div className="flex items-center space-x-1">
              <AlertCircle className="h-4 w-4" />
              <span>{isOutOfStock ? 'Rupture de stock' : 'Stock faible'}</span>
            </div>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xl font-bold text-gray-900">{product.price}€</span>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`p-2 rounded-full transition-colors ${
              isOutOfStock
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
