import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AddProductModal from './components/AddProductModal';
import CartModal from './components/CartModal';
import AdminPanel from './components/AdminPanel';
import PaymentForm from './components/PayementForm';
import { Product, CartItem } from './types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Appareil Photo Numérique',
    description: 'Appareil photo haute résolution avec objectif interchangeable',
    price: 699.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    stock: 15,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Montre Connectée',
    description: 'Montre intelligente avec suivi d\'activité et notifications',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    stock: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Casque Audio Premium',
    description: 'Casque sans fil avec réduction de bruit active',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80',
    category: 'electronics',
    stock: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

function App() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const handleAddProduct = (newProduct: Product) => {
    const productWithDates = {
      ...newProduct,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stock: 10
    };
    setProducts([...products, productWithDates]);
  };

  const handleUpdateProduct = (updatedProduct: Product) => {
    setProducts(products.map(p => 
      p.id === updatedProduct.id 
        ? { ...updatedProduct, updatedAt: new Date().toISOString() }
        : p
    ));
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
  };

  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) {
      alert('Ce produit est en rupture de stock');
      return;
    }

    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          alert('Stock insuffisant');
          return prevItems;
        }
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });

    // Mettre à jour le stock
    handleUpdateProduct({ ...product, stock: product.stock - 1 });
  };

  const handleUpdateCartQuantity = (itemId: string, newQuantity: number) => {
    const product = products.find(p => p.id === itemId);
    const cartItem = cartItems.find(item => item.id === itemId);
    
    if (!product || !cartItem) return;

    const quantityDiff = newQuantity - cartItem.quantity;
    
    if (quantityDiff > 0 && quantityDiff > product.stock) {
      alert('Stock insuffisant');
      return;
    }

    if (newQuantity === 0) {
      handleRemoveFromCart(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
      handleUpdateProduct({ ...product, stock: product.stock - quantityDiff });
    }
  };

  const handleRemoveFromCart = (itemId: string) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    const product = products.find(p => p.id === itemId);
    
    if (cartItem && product) {
      handleUpdateProduct({ ...product, stock: product.stock + cartItem.quantity });
    }
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isAdminMode) {
    return (
      <div className="flex flex-col h-screen">
        <div className="bg-white shadow-md p-4">
          <button
            onClick={() => setIsAdminMode(false)}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
          >
            Retour à la Boutique
          </button>
        </div>
        <AdminPanel
          products={products}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar
        cartCount={totalCartItems}
        onSearchChange={setSearchQuery}
        onCartClick={() => setIsCartModalOpen(true)}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Nos Produits</h1>
          <div className="space-x-4">
            <button
              onClick={() => setIsAdminMode(true)}
              className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700"
            >
              Mode Admin
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Ajouter un Produit</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun produit ne correspond à votre recherche</p>
          </div>
        )}
      </main>

      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
      />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />
    </div>
  );
}

export default App;
