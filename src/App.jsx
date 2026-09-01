import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useCart } from './hooks/useCart';
import Cart from './components/Cart';
import StorefrontHome from './pages/StorefrontHome';
import PartsCatalog from './pages/PartsCatalog';

export default function App() {
  const cart = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const onOpenCart = () => setCartOpen(true);

  return (
    <>
      <Routes>
        <Route path="/" element={<StorefrontHome cart={cart} onOpenCart={onOpenCart} />} />
        <Route path="/parts" element={<PartsCatalog cart={cart} onOpenCart={onOpenCart} />} />
        {/* Unregistered routes (dashboard, etc.) fall back to the storefront for now —
            wiring those up is ops-side work, out of scope here. */}
        <Route path="*" element={<StorefrontHome cart={cart} onOpenCart={onOpenCart} />} />
      </Routes>

      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cart.items}
        removeItem={cart.removeItem}
        updateQty={cart.updateQty}
        clearCart={cart.clearCart}
        subtotal={cart.subtotal}
        hasQuoteItems={cart.hasQuoteItems}
      />
    </>
  );
}
