import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  PieChart,
  TrendingUp,
  Package as PackageIcon,
  AlertCircle,
} from 'lucide-react';
import { Product, Order, SalesStats } from '../types';

interface AdminPanelProps {
  products: Product[];
  onUpdateProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export default function AdminPanel({
  products,
  onUpdateProduct,
  onDeleteProduct,
}: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'products' | 'orders' | 'customers' | 'settings'>('dashboard');

  // Données simulées pour le tableau de bord
  const mockStats: SalesStats = {
    daily: 1250,
    weekly: 8750,
    monthly: 35000,
    totalOrders: 1234,
    totalRevenue: 124500,
  };

  const mockOrders: Order[] = [
    {
      id: '1',
      items: [],
      total: 699.99,
      status: 'pending',
      customerEmail: 'client@example.com',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Ventes Aujourd'hui</h3>
          <TrendingUp className="text-green-500" />
        </div>
        <p className="text-2xl font-bold">{mockStats.daily}€</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Commandes Totales</h3>
          <ShoppingBag className="text-blue-500" />
        </div>
        <p className="text-2xl font-bold">{mockStats.totalOrders}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Revenu Total</h3>
          <PieChart className="text-purple-500" />
        </div>
        <p className="text-2xl font-bold">{mockStats.totalRevenue}€</p>
      </div>

      <div className="col-span-full">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Produits en Rupture de Stock</h3>
          <div className="space-y-4">
            {products.filter(p => p.stock < 5).map(product => (
              <div key={product.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <AlertCircle className="text-red-500" />
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-600">Stock: {product.stock}</p>
                  </div>
                </div>
                <button
                  onClick={() => onUpdateProduct({ ...product, stock: product.stock + 10 })}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Réapprovisionner
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Gestion des Produits</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catégorie</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prix</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img src={product.image} alt={product.name} className="h-10 w-10 rounded-full object-cover" />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.price}€</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{product.stock}</td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <button
                      onClick={() => onUpdateProduct(product)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-6">Commandes Récentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {mockOrders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.customerEmail}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.total}€</td>
                  <td className="px-6 py-4">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">Administration</h1>
        </div>
        <nav className="mt-6">
          <div className="px-4 space-y-2">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm rounded-lg ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>Tableau de Bord</span>
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm rounded-lg ${
                activeTab === 'products' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Package className="h-5 w-5" />
              <span>Produits</span>
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm rounded-lg ${
                activeTab === 'orders' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Commandes</span>
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm rounded-lg ${
                activeTab === 'customers' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span>Clients</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center space-x-2 w-full px-4 py-2 text-sm rounded-lg ${
                activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>Paramètres</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'orders' && renderOrders()}
          {activeTab === 'customers' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Gestion des Clients</h2>
              <p className="text-gray-500 mt-4">Fonctionnalité à venir</p>
            </div>
          )}
          {activeTab === 'settings' && (
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-bold">Paramètres</h2>
              <p className="text-gray-500 mt-4">Fonctionnalité à venir</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
