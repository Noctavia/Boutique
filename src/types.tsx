export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }
  
  export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    customerEmail: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface SalesStats {
    daily: number;
    weekly: number;
    monthly: number;
    totalOrders: number;
    totalRevenue: number;
  }
