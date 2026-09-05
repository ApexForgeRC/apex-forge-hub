import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, Check, ExternalLink, CarFront, Database } from 'lucide-react';
import { PARTS, PART_CATEGORIES } from '../data/parts';
import { VEHICLE_REGISTRY } from '../data/vehicleRegistry';

const ETSY_URL = 'https://apexforgemotorsports.etsy.com';

function stockBadge(stock) {
  if (stock === 'In stock') return { label: 'In Stock', className: 'text-green-400 border-green-400/30 bg-green-400/10' };
  if (stock === 'Sold out') return { label: 'Sold Out', className: 'text-zinc-500 border-zinc-600/30 bg-zinc-600/10' };
  return { label: stock || 'Contact', className: 'text-[#E10600] border-[#E10600]/30 bg-[#E10600]/10' };
}

function partMatchesVehicle(part, vehicle) {
  if (!vehicle) return true;
  const haystack = `${part.platform} ${part.fits} ${part.fullName}`.toLowerCase();
  return vehicle.aliases.some(alias => haystack.includes(alias.toLowerCase()));
}

export default function PartsCatalog({ cart, onOpenCart }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [vehicleId, setVehicleId] = useState('All');
  const [justAdded, setJustAdded] = useState(null);
  const itemCount = cart?.itemCount ?? 0;

  const selectedVehicle = VEHICLE_REGISTRY.find(v => v.id === vehicleId) || null;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    return PARTS.filter(p => {
      const matchesVehicle = partMatchesVehicle(p, selectedVehicle);
      const matchesCategory = category === 'All' || p.category === category;
      const matchesQuery = !q ||
        p.fullName.toLowerCase().includes(q) ||
        p.platform.toLowerCase().includes(q) ||
        p.fits.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);

      return matchesVehicle && matchesCategory && matchesQuery;
    });
  }, [query, category, selectedVehicle]);

  const stats = useMemo(() => {
    const inStock = filtered.filter(p => p.stock === 'In stock').length;
    const categories = new Set(filtered.map(p => p.category)).size;
    return { inStock, categories };
  }, [filtered]);

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

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <Link to="/" className="flex items-center gap-3 text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">
          <ArrowLeft size={14} /> Apex <span className="text-[#E10600]">Forge</span> RC
        </Link>
        <div className="flex items-center gap-6">
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hidden md:block text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Etsy</a>
          <button onClick={onOpenCart} className="relative text-zinc-500 hover:text-white transition-colors" aria-label="Open cart">
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#E10600] text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>
            )}
          </button>
        </div>
      </nav>

      <section className="px-8 pt-32 pb-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#E10600] text-xs font-bold uppercase tracking-[0.3em] mb-3">Repair + Rebuild Parts</p>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4">Find The Part.</h1>
          <p className="text-zinc-500 text-sm max-w-2xl leading-relaxed">
            Search the catalog directly or start with the RC on your bench. Vehicle fitment, source data, stock, and pricing stay under the hood so the lookup stays fast and simple.
          </p>

          <div className="grid lg:grid-cols-[1fr_1fr_auto] gap-3 mt-10">
            <div>
              <label className="block text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Vehicle</label>
              <div className="relative">
                <CarFront size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 pointer-events-none" />
                <select
                  value={vehicleId}
                  onChange={e => {
                    setVehicleId(e.target.value);
                    setCategory('All');
                  }}
                  className="w-full appearance-none bg-[#141414] border border-white/10 text-white text-sm pl-11 pr-4 py-3.5 rounded-xl focus:border-[#E10600] outline-none transition-colors cursor-pointer"
                >
                  <option value="All">All vehicles</option>
                  {VEHICLE_REGISTRY.map(vehicle => (
                    <option key={vehicle.id} value={vehicle.id}>
                      {vehicle.brand} {vehicle.shortName} — {vehicle.sku}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Search</label>
              <div className="relative">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
                <input
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Part name, platform, fitment..."
                  className="w-full bg-[#141414] border border-white/10 text-white text-sm pl-11 pr-4 py-3.5 rounded-xl focus:border-[#E10600] outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] mb-2">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="bg-[#141414] border border-white/10 text-white text-sm px-4 py-3.5 rounded-xl focus:border-[#E10600] outline-none transition-colors cursor-pointer min-w-56"
              >
                <option value="All">All categories</option>
                {PART_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          {selectedVehicle && (
            <div className="mt-5 bg-[#111] border border-[#E10600]/20 rounded-2xl p-4 grid md:grid-cols-[160px_1fr_auto] gap-4 md:items-center">
              <div className="bg-white rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                {selectedVehicle.imageUrl ? (
                  <img
                    src={selectedVehicle.imageUrl}
                    alt={`${selectedVehicle.brand} ${selectedVehicle.name}`}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <CarFront size={34} className="text-zinc-700" />
                )}
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#E10600]/10 flex items-center justify-center shrink-0">
                  <Database size={17} className="text-[#E10600]" />
                </div>
                <div>
                  <p className="text-white text-sm font-black uppercase tracking-wide">{selectedVehicle.brand} {selectedVehicle.name}</p>
                  <p className="text-zinc-600 text-xs mt-1">SKU {selectedVehicle.sku} · {selectedVehicle.generation} · source: {selectedVehicle.source}</p>
                  {selectedVehicle.imageSource && (
                    <p className="text-zinc-700 text-[10px] mt-1">Vehicle image: {selectedVehicle.imageSource}</p>
                  )}
                </div>
              </div>
              <div className="md:text-right">
                <span className="block text-zinc-700 text-[9px] font-black uppercase tracking-[0.2em] mb-2">Reference data</span>
                <a
                  href={selectedVehicle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-600 hover:text-white text-[10px] font-bold uppercase tracking-wider transition-colors"
                >
                  Manufacturer Reference <ExternalLink size={11} />
                </a>
              </div>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mt-5 max-w-xl">
            <div className="bg-[#101010] border border-white/5 rounded-xl p-3">
              <span className="block text-zinc-700 text-[9px] uppercase tracking-widest">Results</span>
              <strong className="text-lg">{filtered.length}</strong>
            </div>
            <div className="bg-[#101010] border border-white/5 rounded-xl p-3">
              <span className="block text-zinc-700 text-[9px] uppercase tracking-widest">In Stock</span>
              <strong className="text-lg">{stats.inStock}</strong>
            </div>
            <div className="bg-[#101010] border border-white/5 rounded-xl p-3">
              <span className="block text-zinc-700 text-[9px] uppercase tracking-widest">Categories</span>
              <strong className="text-lg">{stats.categories}</strong>
            </div>
          </div>

          {selectedVehicle && (
            <p className="text-zinc-700 text-[11px] mt-4">
              Fitment results currently use Apex catalog platform/fitment data. Exact SKU-level verification is the next ingestion layer.
            </p>
          )}
        </div>
      </section>

      <section className="px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-zinc-600 text-sm">No parts match those filters.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(part => {
                const badge = stockBadge(part.stock);
                const soldOut = part.stock === 'Sold out';
                const added = justAdded === part.id;
                return (
                  <div key={part.id} className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex flex-col justify-between hover:border-[#E10600]/20 transition-all duration-300">
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
                      <div>
                        <span className="block text-[#E10600] font-black text-xl">${part.sellPrice.toFixed(2)}</span>
                        <span className="text-zinc-700 text-[9px] uppercase tracking-widest">Apex price</span>
                      </div>
                      <button
                        onClick={() => !soldOut && addToCart(part)}
                        disabled={soldOut}
                        className={`flex items-center gap-2 text-xs font-black uppercase tracking-wider px-4 py-2.5 rounded-full transition-all ${
                          soldOut
                            ? 'bg-white/5 text-zinc-600 cursor-not-allowed'
                            : added
                              ? 'bg-green-400 text-black'
                              : 'bg-[#E10600] text-black hover:bg-white'
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

      <footer className="border-t border-white/5 px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-black text-lg tracking-tighter uppercase">
            Apex <span className="text-[#E10600]">Forge</span> RC
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
