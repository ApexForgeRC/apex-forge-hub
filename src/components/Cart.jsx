import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-react';

/**
 * Cart drawer for Apex Forge.
 *
 * Props:
 *   open: boolean
 *   onClose: () => void
 *   items, removeItem, updateQty, clearCart, subtotal, hasQuoteItems  (from useCart)
 *
 * Order submission: opens user's email client with a pre-filled message
 * to info@apexforgerc.com. To swap in EmailJS later, see TODO block in submitOrder().
 */
export default function Cart({ open, onClose, items, removeItem, updateQty, clearCart, subtotal, hasQuoteItems }) {
  const [stage, setStage] = useState('cart'); // 'cart' | 'checkout' | 'success'
  const [form, setForm] = useState({ name: '', email: '', phone: '', fulfill: 'pickup', address: '', notes: '' });
  const [orderRef, setOrderRef] = useState('');

  const updateField = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const submitOrder = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      alert('Name and email are required.');
      return;
    }

    const ref = 'AF-' + Date.now().toString(36).toUpperCase();
    setOrderRef(ref);

    // Build human-readable order summary for the email
    const itemLines = items.map((item, idx) => {
      const configLines = Object.entries(item.config || {})
        .map(([partName, opts]) => `    • ${partName}: ${opts.color} / ${opts.material}${opts.upcharge ? ` (+$${opts.upcharge})` : ''}`)
        .join('\n');
      const priceStr = item.quoteOnly ? 'QUOTE REQUESTED' : `$${(item.totalPrice * item.qty).toFixed(2)}`;
      return `${idx + 1}. ${item.productName} × ${item.qty} — ${priceStr}\n${configLines}`;
    }).join('\n\n');

    const body = `NEW ORDER REQUEST — ${ref}
============================================

CUSTOMER
  Name:    ${form.name}
  Email:   ${form.email}
  Phone:   ${form.phone || '(not provided)'}
  Fulfill: ${form.fulfill}
  Address: ${form.address || '(not provided)'}

ITEMS
${itemLines}

SUBTOTAL (priced items): $${subtotal.toFixed(2)}
${hasQuoteItems ? '** Contains custom-quote items — final pricing TBD **\n' : ''}
CUSTOMER NOTES
${form.notes || '(none)'}

============================================
Ref: ${ref}
Submitted: ${new Date().toLocaleString()}`;

    const subject = `New Order ${ref} — ${form.name}`;
    const mailtoUrl = `mailto:info@apexforgerc.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // ====================================================================
    // ORDER SUBMISSION
    // Current: opens the user's email client with a pre-filled message.
    // Works immediately, no service setup. Customer hits send → you get it.
    //
    // To upgrade to EmailJS (silent send, no email client popup):
    //   1. npm install @emailjs/browser
    //   2. import emailjs from '@emailjs/browser';
    //   3. Replace the mailto block below with:
    //        await emailjs.send('SERVICE_ID', 'TEMPLATE_ID',
    //          { ref, name: form.name, email: form.email, body },
    //          'PUBLIC_KEY');
    //   4. Configure the template at emailjs.com to send to info@apexforgerc.com
    // ====================================================================
    window.location.href = mailtoUrl;

    setStage('success');
  };

  const resetAndClose = () => {
    clearCart();
    setForm({ name: '', email: '', phone: '', fulfill: 'pickup', address: '', notes: '' });
    setStage('cart');
    onClose();
  };

  if (!open) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-apex-dark border-l-2 border-apex-orange z-50 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-neutral-800">
          <h2 className="font-cinzel text-2xl tracking-widest text-titanium">
            {stage === 'success' ? 'ORDER SENT' : stage === 'checkout' ? 'YOUR DETAILS' : 'YOUR CART'}
          </h2>
          <button
            onClick={onClose}
            className="text-titanium hover:text-apex-orange transition-colors"
            aria-label="Close cart"
          >
            <X size={22} />
          </button>
        </div>

        {/* SUCCESS VIEW */}
        {stage === 'success' && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="font-cinzel text-6xl text-apex-orange mb-2">✓</div>
            <h3 className="font-cinzel text-2xl tracking-wider text-titanium mb-4">REQUEST SENT</h3>
            <div className="font-mono text-sm text-apex-orange border border-dashed border-apex-orange px-4 py-2 mb-6">
              REF: {orderRef}
            </div>
            <p className="text-neutral-400 text-sm leading-relaxed mb-6 max-w-xs">
              Your email client opened with the order details. Hit send to deliver it to
              info@apexforgerc.com. I'll reply with an invoice/quote within 24 hours.
            </p>
            <button
              onClick={resetAndClose}
              className="w-full bg-apex-orange hover:bg-orange-400 text-apex-black font-bold tracking-widest py-3 transition-colors"
            >
              CONTINUE BROWSING
            </button>
          </div>
        )}

        {/* CART VIEW */}
        {stage === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingCart size={48} className="mx-auto text-neutral-700 mb-4" />
                  <p className="text-neutral-500 tracking-wider">CART IS EMPTY</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.lineId} className="border-b border-neutral-800 py-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1 pr-3">
                        <h4 className="font-cinzel text-lg tracking-wide text-titanium">{item.productName}</h4>
                        {item.quoteOnly ? (
                          <span className="inline-block mt-1 text-xs font-mono tracking-widest text-apex-orange border border-apex-orange px-2 py-0.5">
                            QUOTE REQUEST
                          </span>
                        ) : (
                          <p className="text-xs text-neutral-500 font-mono mt-0.5">
                            BASE ${item.basePrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-cinzel text-xl text-apex-orange">
                          {item.quoteOnly ? 'QUOTE' : `$${(item.totalPrice * item.qty).toFixed(2)}`}
                        </div>
                      </div>
                    </div>

                    {/* Configuration breakdown */}
                    {item.config && Object.keys(item.config).length > 0 && (
                      <div className="bg-apex-black/50 border-l-2 border-apex-orange pl-3 py-2 mb-3 text-xs">
                        {Object.entries(item.config).map(([partName, opts]) => (
                          <div key={partName} className="flex justify-between text-neutral-400">
                            <span><span className="text-titanium">{partName}:</span> {opts.color} / {opts.material}</span>
                            {opts.upcharge > 0 && <span className="text-apex-orange font-mono">+${opts.upcharge}</span>}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQty(item.lineId, -1)}
                        className="w-7 h-7 bg-apex-black border border-neutral-700 hover:border-apex-orange hover:text-apex-orange text-titanium transition-colors flex items-center justify-center"
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-mono font-bold w-8 text-center text-titanium">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.lineId, 1)}
                        className="w-7 h-7 bg-apex-black border border-neutral-700 hover:border-apex-orange hover:text-apex-orange text-titanium transition-colors flex items-center justify-center"
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.lineId)}
                        className="ml-auto text-xs text-neutral-500 hover:text-apex-orange tracking-widest flex items-center gap-1 transition-colors"
                      >
                        <Trash2 size={12} /> REMOVE
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t-2 border-apex-orange bg-apex-black p-5">
                {hasQuoteItems && (
                  <div className="bg-apex-dark border-l-2 border-apex-orange text-xs text-neutral-400 italic p-2 mb-3">
                    Cart contains custom-quote items — final pricing in your invoice.
                  </div>
                )}
                <div className="flex justify-between items-baseline mb-4">
                  <span className="font-mono text-xs tracking-widest text-neutral-500 uppercase">Estimated Total</span>
                  <span className="font-cinzel text-3xl text-apex-orange">${subtotal.toFixed(2)}</span>
                </div>
                <button
                  onClick={() => setStage('checkout')}
                  className="w-full bg-apex-orange hover:bg-orange-400 text-apex-black font-bold tracking-widest py-3 transition-colors"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </>
        )}

        {/* CHECKOUT VIEW */}
        {stage === 'checkout' && (
          <form onSubmit={submitOrder} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-5">
              <button
                type="button"
                onClick={() => setStage('cart')}
                className="text-xs font-mono tracking-widest text-neutral-500 hover:text-apex-orange mb-4 transition-colors"
              >
                ← BACK TO CART
              </button>
              <p className="text-sm text-neutral-400 mb-5">
                No payment now — I'll review your order and reply with an invoice within 24 hours.
              </p>

              {[
                { id: 'name', label: 'Name *', type: 'text', required: true },
                { id: 'email', label: 'Email *', type: 'email', required: true },
                { id: 'phone', label: 'Phone', type: 'tel' },
              ].map(f => (
                <div key={f.id} className="mb-4">
                  <label className="block font-mono text-xs tracking-widest text-neutral-500 uppercase mb-1">{f.label}</label>
                  <input
                    type={f.type}
                    required={f.required}
                    value={form[f.id]}
                    onChange={(e) => updateField(f.id, e.target.value)}
                    className="w-full bg-apex-black border border-neutral-700 focus:border-apex-orange text-titanium px-3 py-2 outline-none transition-colors"
                  />
                </div>
              ))}

              <div className="mb-4">
                <label className="block font-mono text-xs tracking-widest text-neutral-500 uppercase mb-1">Pickup or Ship?</label>
                <select
                  value={form.fulfill}
                  onChange={(e) => updateField('fulfill', e.target.value)}
                  className="w-full bg-apex-black border border-neutral-700 focus:border-apex-orange text-titanium px-3 py-2 outline-none transition-colors"
                >
                  <option value="pickup">Local pickup (metro Atlanta)</option>
                  <option value="ship">Ship to me</option>
                  <option value="either">Either, you decide</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block font-mono text-xs tracking-widest text-neutral-500 uppercase mb-1">Shipping Address</label>
                <textarea
                  rows={2}
                  value={form.address}
                  onChange={(e) => updateField('address', e.target.value)}
                  className="w-full bg-apex-black border border-neutral-700 focus:border-apex-orange text-titanium px-3 py-2 outline-none resize-y transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block font-mono text-xs tracking-widest text-neutral-500 uppercase mb-1">Notes / Special Requests</label>
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={(e) => updateField('notes', e.target.value)}
                  placeholder="Deadline? S