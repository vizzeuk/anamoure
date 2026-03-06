"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

export type CartItem = {
  id: string;        // _id del producto
  slug: string;      // para el link
  name: string;
  category: string;
  sizeName?: string; // talla/formato seleccionado
  price: number | null; // null = sin precio definido
  quantity: number;  // 1 | 6 | 12 | 24
  cotizar: boolean;  // true cuando se eligió "+24 Cotizar"
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity"> & { cotizar?: boolean }) => void;
  updateItem: (id: string, sizeName: string | undefined, quantity: number) => void;
  removeItem: (id: string, sizeName?: string) => void;
  clearCart: () => void;
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Cargar desde localStorage solo en el cliente
  useEffect(() => {
    try {
      const stored = localStorage.getItem("anamoure-cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persistir en localStorage al cambiar
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("anamoure-cart", JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback(
    (newItem: Omit<CartItem, "quantity"> & { cotizar?: boolean }) => {
      setItems((prev) => {
        const key = `${newItem.id}__${newItem.sizeName ?? ""}`;
        const exists = prev.find(
          (i) => `${i.id}__${i.sizeName ?? ""}` === key
        );
        if (exists) return prev;
        return [...prev, { ...newItem, quantity: 1, cotizar: newItem.cotizar ?? false }];
      });
    },
    []
  );

  const updateItem = useCallback(
    (id: string, sizeName: string | undefined, quantity: number) => {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id && (item.sizeName ?? "") === (sizeName ?? "")
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const removeItem = useCallback((id: string, sizeName?: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.id === id && (i.sizeName ?? "") === (sizeName ?? ""))
      )
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItem,
        removeItem,
        clearCart,
        totalItems,
        isOpen,
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart debe usarse dentro de CartProvider");
  return ctx;
}
