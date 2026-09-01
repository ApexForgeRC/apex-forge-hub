import React from 'react';
import { ChevronRight, Printer, Package, Star, ArrowUpRight, Wrench, MapPin, Clock, Palette } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <span className="font-black text-lg tracking-tighter uppercase">
          Apex <span className="text-[#FF6B00]">Forge</span>
        </span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Services</a>
          <a href="#how-it-works" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">How It Works</a>
          <a href="/rc" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">RC Builds</a>
          <a href="mailto:paul@apexforgerc.com" className="group flex items-center gap-2 bg-[#FF6B00] text-black font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-[#FF6B00]/90 transition-all">
            Get a Quote <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end pb-20 px-8 pt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6B00] opacity-[0.04] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF6B00] opacity-[0.03] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col gap-6 max-w-5xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em]">Woodstock, Georgia // Local Pickup Available</span>
            </div>

            <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter uppercase">
              Print<br />
              Anything<span className="text-[#FF6B00]">.</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
              Local 3D printing service in Woodstock, GA. You bring the idea — we print it. Multi-color, fast turnaround, pickup or delivery in the Atlanta area.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:paul@apexforgerc.com"
                className="group flex items-center gap-3 bg-[#FF6B00] text-black font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(255,107,0,0.25)]">
                Get a Quote
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#how-it-works"
                className="flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                How It Works
              </a>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap gap-12 mt-20 pt-12 border-t border-white/5">
            {[
              { value: 'PLA / PETG / TPU', label: 'Materials' },
              { value: 'Multi-Color', label: 'AMS Printing' },
              { value: 'Woodstock GA', label: 'Local Pickup' },
              { value: 'Fast', label: 'Turnaround' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                <div className="text-zinc-600 text-xs uppercase tracking-[0.2em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">What We Do</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter">Services</h2>
            </div>
            <a href="mailto:paul@apexforgerc.com" className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
              All inquiries <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Print to Order */}
            <div className="md:col-span-7 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Printer className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Print to Order</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">Have an STL file or a description of what you need? Send it over and we'll print it. FDM printing in PLA, PLA+, PETG, TPU, and ASA-CF. Multi-color available.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Priced per project</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            {/* Motorsport & Decor */}
            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Star className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Motorsport & Decor</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">F1 calendars, diecast display stands, wall art, lightboxes, and more. Ready-made products available to ship or pickup.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">From $15</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            {/* Home & Functional */}
            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[260px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Package className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Home & Functional</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Organizers, brackets, replacement parts, hooks, holders — if it can be printed, we can make it.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Contact for pricing</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            {/* CTA */}
            <div
              onClick={() => window.location.href = 'mailto:paul@apexforgerc.com'}
              className="md:col-span-7 bg-[#FF6B00] rounded-3xl p-10 flex flex-col justify-between min-h-[260px] cursor-pointer hover:bg-[#FF6B00]/90 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-black mb-3">Have an Idea?</h3>
                <p className="text-black/60 text-sm leading-relaxed max-w-sm">Don't know where to start? Describe what you need and we'll figure it out. No idea too small.</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-black font-black text-sm">paul@apexforgerc.com</span>
                <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                  <ArrowUpRight className="text-black" size={20} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="px-8 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Simple Process</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">How It Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { step: '01', icon: <Palette size={24} />, title: 'Send Your Idea', desc: 'Email us your STL file, a description, or a reference image. No file? No problem — we can source or help spec it out.' },
              { step: '02', icon: <Printer size={24} />, title: 'We Print It', desc: 'We confirm materials, color, and timeline. Bambu P1S with AMS — multi-color, fast, precise. Most jobs done in 24–48 hours.' },
              { step: '03', icon: <MapPin size={24} />, title: 'Local Pickup', desc: 'Pick up in Woodstock, GA. Atlanta area delivery available. No shipping costs, no waiting a week for a package.' },
            ].map((item) => (
              <div key={item.step} className="bg-[#141414] border border-white/5 rounded-3xl p-10 hover:border-[#FF6B00]/20 transition-all duration-300">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center text-[#FF6B00]">
                    {item.icon}
                  </div>
                  <span className="text-zinc-800 font-black text-4xl tracking-tighter">{item.step}</span>
                </div>
                <h3 className="text-xl font-black uppercase tracking-tight mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="px-8 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Print Materials</p>
            <h2 className="text-5xl font-black uppercase tracking-tighter">What We Print With</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'PLA', desc: 'Standard, indoor, display' },
              { name: 'PLA+', desc: 'Stronger, better finish' },
              { name: 'PETG', desc: 'Heat & UV resistant' },
              { name: 'TPU', desc: 'Flexible, impact resistant' },
              { name: 'ASA-CF', desc: 'Outdoor, structural' },
            ].map((mat) => (
              <div key={mat.name} className="bg-[#141414] border border-white/5 rounded-2xl p-6 hover:border-[#FF6B00]/20 transition-all">
                <div className="text-[#FF6B00] font-black text-xl mb-1">{mat.name}</div>
                <div className="text-zinc-600 text-xs">{mat.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RC Builds CTA */}
      <section className="px-8 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#141414] border border-white/5 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Also Available</p>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-3">Custom RC Builds</h2>
              <p className="text-zinc-500 text-sm max-w-md leading-relaxed">We also build custom 1/10 scale RC cars from the ground up. Full chassis builds, 3D printed bodies, Hobbywing electronics.</p>
            </div>
            <a href="/rc" className="group flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-[#FF6B00] hover:text-black hover:border-[#FF6B00] transition-all duration-300 whitespace-nowrap">
              See RC Builds <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-black text-lg tracking-tighter uppercase">
            Apex <span className="text-[#FF6B00]">Forge</span>
          </span>
          <div className="flex items-center gap-8 text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="mailto:paul@apexforgerc.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://instagram.com/apexforgerc" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://etsy.com/shop/ApexForgeMotorsports" className="hover:text-white transition-colors">Etsy</a>
          </div>
          <span className="text-zinc-700 text-xs uppercase tracking-widest">© 2025 Apex Forge</span>
        </div>
      </footer>

    </div>
  );
}
