import React, { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Cart from './components/Cart'
import { useCart } from './hooks/useCart'

import Home from './pages/Home'
import PartsCatalog from './pages/PartsCatalog'

export default function App() {
  const cart = useCart()
  const [cartOpen, setCartOpen] = useState(false)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parts" element={<PartsCatalog cart={cart} onOpenCart={() => setCartOpen(true)} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
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
  )
}
