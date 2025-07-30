

import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Language, CartItem, Product, ShippingAddress } from '../types';
import { i18n, PROMO_CODES } from '../components/constants';

// Supabase-related imports and client initialization have been removed.

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, options?: { size?: string; color?: string }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => { subtotal: number; discount: number; total: number };
  applyPromoCode: (code: string) => boolean;
  wishlist: number[];
  toggleWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  products: Product[];
  addProductToState: (product: Product) => void;
  updateProductInState: (id: number, updatedProduct: Product) => void;
  deleteProductFromState: (id: number) => void;
  shippingAddress: ShippingAddress | null;
  setShippingAddress: (address: ShippingAddress) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(Language.RU);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch from the local backend server.
        const response = await fetch('https://my-store-api-towt.onrender.com/api/products');
        if (!response.ok) {
          throw new Error(`Backend not available: ${response.statusText}`);
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Could not fetch products from backend:', error);
        // If the backend is down, products will remain an empty array.
        // The UI should handle this state gracefully.
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);


  const t = useCallback((key: string): string => {
    return i18n[key]?.[language] || key;
  }, [language]);


  // === Cart Functions ===
  const addToCart = (product: Product, quantity = 1, options?: { size?: string; color?: string }) => {
    setCart(prevCart => {
        const existingItem = prevCart.find(item =>
            item.id === product.id &&
            item.selectedSize === options?.size &&
            item.selectedColor === options?.color
        );

        if (existingItem) {
            return prevCart.map(item =>
                item.cart_item_id === existingItem.cart_item_id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
            );
        } else {
            const newCartItem: CartItem = {
                ...product,
                cart_item_id: crypto.randomUUID(),
                quantity,
                selectedSize: options?.size,
                selectedColor: options?.color,
            };
            return [...prevCart, newCartItem];
        }
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.cart_item_id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
    } else {
      setCart(prev => prev.map(item => item.cart_item_id === cartItemId ? { ...item, quantity } : item));
    }
  };

  const clearCart = () => {
    setCart([]);
    setPromoDiscount(0);
  };
  
  const applyPromoCode = (code: string): boolean => {
    const upperCaseCode = code.toUpperCase();
    if (upperCaseCode in PROMO_CODES) {
      setPromoDiscount(PROMO_CODES[upperCaseCode as keyof typeof PROMO_CODES]);
      return true;
    }
    setPromoDiscount(0);
    return false;
  };
  
  const getCartTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = subtotal * promoDiscount;
    const total = subtotal - discount;
    return { subtotal, discount, total };
  };

  // === Wishlist Functions ===
  const toggleWishlist = (productId: number) => {
    setWishlist(prev => {
        if (prev.includes(productId)) {
            return prev.filter(id => id !== productId);
        } else {
            return [...prev, productId];
        }
    });
  };
  
  const isInWishlist = (productId: number) => {
      return wishlist.includes(productId);
  };
  
  // === Product State Management ===
  const addProductToState = (product: Product) => {
    setProducts(prev => [...prev, product].sort((a, b) => a.id - b.id));
  };
  
  const updateProductInState = (id: number, updatedProduct: Product) => {
      setProducts(prev => prev.map(p => p.id === id ? updatedProduct : p));
  };

  const deleteProductFromState = (id: number) => {
      setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <AppContext.Provider value={{ 
        language, setLanguage, t, cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, 
        applyPromoCode, wishlist, toggleWishlist, isInWishlist,
        products, addProductToState, updateProductInState, deleteProductFromState,
        shippingAddress, setShippingAddress,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};