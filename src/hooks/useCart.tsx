import { createContext, useContext, useEffect, useState, type ReactNode } from "react"; 
import { getCart } from "../utils/auth";

interface CartContextType {
  cartCount: number;
  loadCartCount: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState(0);

  const loadCartCount = async () => {
    try {
      const data = await getCart();
      setCartCount(data?.cart?.selectedCategories?.length || 0);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    loadCartCount();
  }, []);

  return (
    <CartContext.Provider value={{ cartCount, loadCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
