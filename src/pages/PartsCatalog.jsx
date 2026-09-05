import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Check, ExternalLink } from 'lucide-react';
import { PARTS, PART_CATEGORIES } from '../data/parts';

const ETSY_URL = 'https://apexforgemotorsports.etsy.com';

function stockBadge(stock) {
  if (stock === 'In stock') return { label: 'In Stock', className: 'text-green-400 border-green-400/30 bg-green-400/10' };
  if (stock === 'Sold out') return { label: 'Sold Out', className: 'text-zinc-500 border-zinc-600/30 bg-zinc-600/10' };
  return { label: stock || 'Contact', className: 'text-[#FF6B00] border-[#FF6B00]/30 bg-[#FF6B00]/10' };
}

export default function PartsCatalog({ cart, onOpenCart }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [justAdded, setJustAdded] = useState(null);
  const itemCount = cart?.itemCount ?? 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PARTS.filter(p => {
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery = !q ||
        p.fullName.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q) ||
        p.fits.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  const addToCart = (part) => {
    cart?.addItem({
      productId: part.id,
      productName: part.fullName,
      config: {},
      basePrice: part.sellPrice,
      totalPrice: part.sellPrice,
      qty: 1,
      quoteOnly: false,
    });
    setJustAdded(part.id);
    setTimeout(() => setJustAdded(cur => (cur === part.id ? null : cur)), 1200);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
          <ArrowLeft size={14} /> Apex <span className="text-[#FF6B00]">Forge</span> RC
        </Link>
        <div className="flex items-center gap-6">
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Etsy</a>
          <button onClick={onOpenCart} className="relative text-zinc-500 hover:text-white transition-colors" aria-label="Open cart">
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="px-8 pt-32 pb-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Repair + Rebuild Parts</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Parts Catalog</h1>
          <p className="text-zinc-500 text-sm max-w-xl leading-relaxed">
            Genuine and take-off Arrma parts for the Big Rock / Granite / Senton / Typhon / Vorteks family — sourced in bulk, priced for project use.
            Growing as I find more.
          </p>

          {/* Search + filter */}
          <div className="flex flex-col md:flex-row gap-3 mt-10">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search parts, platform, or what it fits..."
                className="w-full bg-[#141414] border border-white/10 text-white text-sm pl-11 pr-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none transition-colors"
              />
            </div>
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="bg-[#141414] border border-white/10 text-white text-sm px-4 py-3 rounded-xl focus:border-[#FF6B00] outline-none transition-colors cursor-pointer md:w-64"
            >
              <option value="All">All Categories</option>
              {PART_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <p className="text-zinc-700 text-xs mt-3">{filtered.length} of {PARTS.length} parts</p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-zinc-600 text-sm">No parts match that search.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(part => {
                const badge = stockBadge(part.stock);
                const soldOut = part.stock === 'Sold out';
                const added = justAdded === part.id;
                return (
                  <div key={part.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-[#FF6B00]/20 transition-all duration-300">
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">{part.category}</span>
                        <span className={`text-[10px] font-bold uppercase tracking-wider border rounded-full px-2 py-0.5 whitespace-nowrap ${badge.className}`}>{badge.label}</span>
                      </div>
                      <h3 className="text-base font-bold leading-snug mb-1">{part.part}</h3>
                      <p className="text-zinc-500 text-xs mb-1">{part.platform}</p>
                      <p className="text-zinc-600 text-xs mb-4">Fits: {part.fits}</p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-[#FF6B00] font-black text-xl">${part.sellPrice.toFixed(2)}</span>
                      <button
                        onClick={() => !soldOut && addToCart(part)}
                        disabled={soldOut}
                        className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full transition-all ${
                          soldOut
                            ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
                            : added
                              ? 'bg-green-400 text-black'
                              : 'bg-[#FF6B00] text-black hover:bg-white'
                        }`}
                      >
                        {soldOut ? 'Sold Out' : added ? <><Check size={14} /> Added</> : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-black text-lg tracking-tighter uppercase">
            Apex <span className="text-[#FF6B00]">Forge</span> RC
          </Link>
          <div className="flex items-center gap-8 text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="mailto:paul@apexforgerc.com" className="hover:text-white transition-colors">Email</a>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Etsy <ExternalLink size={11} /></a>
            <a href="https://instagram.com/apexforgerc" className="hover:text-white transition-colors">Instagram</a>
          </div>
          <span className="text-zinc-700 text-xs uppercase tracking-widest">© 2024 Apex Forge RC</span>
        </div>
      </footer>

    </div>
  );
}
