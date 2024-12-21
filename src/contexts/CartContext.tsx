import React, { createContext, useContext, useState } from 'react';
import type { Product } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  calculateTotal: () => number;
  calculateTax: () => number;
  applyDiscount: (code: string) => void;
  removeDiscount: () => void;
  discountAmount: number;
  finalTotal: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.18; // %18 KDV
const DISCOUNT_CODES = {
  'WELCOME10': 0.10,
  'SUMMER20': 0.20,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [discountAmount, setDiscountAmount] = useState(0);
  const { toast } = useToast();

  const addToCart = (product: Product) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return currentItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setItems(currentItems => currentItems.filter(item => item.id !== productId));
    toast({
      title: "Ürün sepetten çıkarıldı",
      description: "Ürün başarıyla sepetinizden çıkarıldı.",
    });
  };

  const clearCart = () => {
    setItems([]);
    setDiscountAmount(0);
    toast({
      title: "Sepet temizlendi",
      description: "Tüm ürünler sepetinizden çıkarıldı.",
    });
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateTotal() * TAX_RATE;
  };

  const applyDiscount = (code: string) => {
    const discountRate = DISCOUNT_CODES[code as keyof typeof DISCOUNT_CODES];
    if (discountRate) {
      const discount = calculateTotal() * discountRate;
      setDiscountAmount(discount);
      toast({
        title: "İndirim uygulandı",
        description: `${code} kodu ile %${discountRate * 100} indirim uygulandı.`,
      });
    } else {
      toast({
        title: "Geçersiz kod",
        description: "Girdiğiniz indirim kodu geçersiz.",
        variant: "destructive",
      });
    }
  };

  const removeDiscount = () => {
    setDiscountAmount(0);
    toast({
      title: "İndirim kaldırıldı",
      description: "Uygulanan indirim kaldırıldı.",
    });
  };

  const finalTotal = () => {
    const subtotal = calculateTotal();
    const tax = calculateTax();
    return subtotal + tax - discountAmount;
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      totalItems,
      calculateTotal,
      calculateTax,
      applyDiscount,
      removeDiscount,
      discountAmount,
      finalTotal
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}