// types.ts

export interface Category {
    id: number;
    name: string;
    description?: string;
  }
  
  export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    size: string;
    color: string;
    material: string;
    brand: string;
    stock: number;
    image: string;
    category: Category;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    // Add other relevant user fields
  }
  
  export interface CartItem {
    id: number;
    product: Product;
    quantity: number;
  }
  
  export interface OrderItem {
    id: number;
    product: Product;
    price: number;  // Price at the time of order
    quantity: number;
  }
  
  export interface Order {
    id: number;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'completed' | 'cancelled'; // Add other relevant statuses
    orderDate: string; // ISO date string
    // Additional fields like shipping address, payment details, etc.
  }
  
  export interface Cart {
    items: CartItem[];
    totalAmount: number;
  }
  
  // Add other types as needed for your application
  