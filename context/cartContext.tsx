"use client"; // <--- 1. ESTO ES OBLIGATORIO

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./AuthContext";
import { toast } from "@/components/ui/use-toast";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

interface CartItem {
  producto: any;
  cantidad: number;
  precio: number;
  _id: string;
}

interface CartContextType {
  items: CartItem[];
  total: number;
  count: number;
  addToCart: (product: any, quantity?: number) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, token } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCart();
    } else {
      setItems([]); 
      setTotal(0);
    }
  }, [isAuthenticated, token]);

  const fetchCart = async () => {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
        setTotal(data.total || 0);
      }
    } catch (error) {
      console.error("Error cargando carrito", error);
    }
  };

  const addToCart = async (product: any, quantity = 1) => {
    if (!isAuthenticated) {
      toast({ title: "Inicia sesión", description: "Debes ingresar para comprar.", variant: "destructive" });
      return;
    }

    try {
      const productId = product._id || product.id;
      const res = await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ productId, quantity })
      });

      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setTotal(data.total);
        toast({ title: "Producto agregado", className: "bg-green-600 text-white" });
      }
    } catch (error) {
      toast({ title: "Error", description: "No se pudo agregar al carrito", variant: "destructive" });
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      const res = await fetch(`${API_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setTotal(data.total);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    try {
      const res = await fetch(`${API_URL}/cart/update`, {
        method: "PUT",
        headers: { 
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ productId, quantity })
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data.items);
        setTotal(data.total);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const count = items.reduce((acc, item) => acc + item.cantidad, 0);

  // 2. VERIFICA QUE ESTO ESTÉ RETORNANDO EL PROVIDER
  return (
    <CartContext.Provider value={{ items, total, count, addToCart, removeFromCart, updateQuantity, isLoading }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};