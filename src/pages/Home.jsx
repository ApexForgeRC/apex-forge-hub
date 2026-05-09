import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Wrench, Printer, Car, Hammer, ArrowUpRight } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <span className="font-black text-lg tracking-tighter uppercase">
          Apex <span className="text-[#FF6B00]">Forge</span> RC
        </span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Services</a>
          <a href="#builds" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Builds</a>
          <a href="mailto:paul@apexforgerc.com" className="group flex items-center gap-2 bg-[#FF6B00] text-black font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-[#FF6B00]/90 transition-all">
            Get a Quote <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end pb-20 px-8 pt-32 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6B00] opacity-[0.04] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#FF6B00] opacity-[0.03] blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="flex flex-col gap-6 max-w-5xl">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em]">Woodstock, Georgia // Est. 2024</span>
            </div>

            <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter uppercase">
              Built<br />
              Different<span className="text-[#FF6B00]">.</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
              Custom 1/10 scale RC builds, precision 3D printed bodies, and chassis mods. Every build is engineered from the ground up.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a href="mailto:paul@apexforgerc.com"
                className="group flex items-center gap-3 bg-[#FF6B00] text-black font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(255,107,0,0.25)]">
                Start a Build
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <button onClick={() => navigate('/dashboard')}
                className="flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                Owner Portal <Wrench size={16} />
              </button>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-12 mt-20 pt-12 border-t border-white/5">
            {[
              { value: '1/10', label: 'Scale Specialist' },
              { value: 'BND + RTR', label: 'Build Options' },
              { value: 'Bambu P1S', label: 'Print Quality' },
              { value: '$350+', label: 'Starting Price' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-black text-white tracking-tight">{stat.value}</div>
                <div className="text-zinc-600 text-xs uppercase tracking-[0.2em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — Bento Grid */}
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

          {/* Bento grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            {/* Large card */}
            <div className="md:col-span-7 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Car className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Complete Builds</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">Full 1/10 scale RC builds, chassis to body. Hobbywing electronics, 3D printed components. BND or RTR — your choice.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">From $350 BND / $400 RTR</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            {/* Small card */}
            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Printer className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">3D Printed Parts</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Custom bodies, brackets, and components. TPU, PLA+, PETG. Precision tolerances for RC fitment.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Priced per project</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            {/* Small card */}
            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[260px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Hammer className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Chassis Mods & Repair</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">ESC installs, connector upgrades, custom mods. Arrma, DKS, and more.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Contact for pricing</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            {/* CTA card */}
            <div
              onClick={() => window.location.href = 'mailto:paul@apexforgerc.com'}
              className="md:col-span-7 bg-[#FF6B00] rounded-3xl p-10 flex flex-col justify-between min-h-[260px] cursor-pointer hover:bg-[#FF6B00]/90 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-black mb-3">Something Custom?</h3>
                <p className="text-black/60 text-sm leading-relaxed max-w-sm">Have a specific build or idea in mind? Reach out and we'll make it happen.</p>
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

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-black text-lg tracking-tighter uppercase">
            Apex <span className="text-[#FF6B00]">Forge</span> RC
          </span>
          <div className="flex items-center gap-8 text-zinc-600 text-xs font-bold uppercase tracking-[0.2em]">
            <a href="mailto:paul@apexforgerc.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://instagram.com/apexforgerc" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://youtube.com/@apexforgerc" className="hover:text-white transition-colors">YouTube</a>
          </div>
          <span className="text-zinc-700 text-xs uppercase tracking-widest">© 2024 Apex Forge RC</span>
        </div>
      </footer>

    </div>
  );
}
