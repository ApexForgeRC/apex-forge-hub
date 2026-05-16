import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'afrc-cart';

/**
 * Cart hook for Apex Forge.
 * Persists cart to localStorage under 'afrc-cart' (matches app convention).
 *
 * Each cart entry is a configured product:
 *   {
 *     lineId: string,       // unique per cart entry (uuid-ish)
 *     productId: string,    // 'dks-basic', 'dks-cramer'
 *     productName: string,
 *     config: { [partId]: { color: string, material: string, upcharge: number } },
 *     basePrice: number,
 *     totalPrice: number,   // basePrice + sum of upcharges
 *     qty: number,
 *     quoteOnly: boolean    // true if customer asked for full custom quote
 *   }
 */
export function useCart() {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Cart persistence failed:', e);
    }
  }, [items]);

  const addItem = useCallback((item) => {
    setItems(prev => [
      ...prev,
      { ...item, lineId: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, qty: item.qty || 1 }
    ]);
  }, []);

  const removeItem = useCallback((lineId) => {
    setItems(prev => prev.filter(i => i.lineId !== lineId));
  }, []);

  const updateQty = useCallback((lineId, delta) => {
    setItems(prev => prev
      .map(i => i.lineId === lineId ? { ...i, qty: Math.max(0, i.qty + delta) } : i)
      .filter(i => i.qty > 0)
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + (i.quoteOnly ? 0 : i.totalPrice * i.qty), 0);
  const hasQuoteItems = items.some(i => i.quoteOnly);

  return { items, addItem, removeItem, updateQty, clearCart, itemCount, subtotal, hasQuoteItems };
}