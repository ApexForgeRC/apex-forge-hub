import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Wrench, Printer, Car, Hammer } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/5">
        <span className="font-black text-xl tracking-tighter uppercase">
          Apex <span className="text-[#FF6B00]">Forge</span> RC
        </span>
        <div className="flex items-center gap-6">
          <a href="#services" className="text-zinc-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">Services</a>
          <a href="#builds" className="text-zinc-400 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">Builds</a>
          <a href="mailto:paul@apexforgerc.com" className="bg-[#FF6B00] text-black font-black px-5 py-2 rounded-full text-sm hover:scale-105 transition-all">
            Get a Quote
          </a>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 overflow-hidden py-24">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00] opacity-10 blur-[120px] rounded-full" />

        <p className="text-[#FF6B00] font-bold uppercase tracking-[0.3em] text-sm mb-6 z-10">
          Atlanta, Georgia // Est. 2024
        </p>

        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-6 z-10">
          Apex Forge<span className="text-[#FF6B00]">RC</span>
        </h1>

        <p className="max-w-xl text-zinc-400 text-lg font-medium mb-12 z-10 leading-relaxed">
          Custom 1/10 scale RC builds, high-detail 3D printed bodies, and chassis modifications — built to your spec in Woodstock, GA.
        </p>

        <div className="flex flex-col md:flex-row gap-4 z-10">
          <a
            href="mailto:paul@apexforgerc.com"
            className="group bg-[#FF6B00] text-black font-black px-10 py-5 rounded-full flex items-center gap-3 text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,107,0,0.3)]"
          >
            START A BUILD <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-full flex items-center gap-3 text-lg hover:bg-white/10 transition-all"
          >
            OWNER PORTAL <Wrench size={20} />
          </button>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="border-t border-zinc-800 bg-zinc-900/20 py-10">
        <div className="max-w-5xl mx-auto px-8 grid grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-[#FF6B00] font-black text-4xl mb-2 italic">1/10</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Scale Specialist</div>
          </div>
          <div>
            <div className="text-[#FF6B00] font-black text-4xl mb-2 italic">BND+RTR</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Build Options</div>
          </div>
          <div>
            <div className="text-[#FF6B00] font-black text-4xl mb-2 italic">BAMBU</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">P1S Print Quality</div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="py-24 px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">What We Build</h2>
          <p className="text-zinc-500 mb-12 text-sm uppercase tracking-widest">Custom work out of Woodstock, GA</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-8 hover:border-[#FF6B00]/40 transition-colors">
              <Car className="text-[#FF6B00] mb-4" size={32} />
              <h3 className="font-black text-xl uppercase mb-2">Complete Builds</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Full 1/10 scale RC builds from chassis to body. BND (you provide transmitter) or RTR. Hobbywing electronics, 3D printed chassis and body.</p>
              <p className="text-[#FF6B00] font-black mt-4 text-sm">From $350 BND / $400 RTR</p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-8 hover:border-[#FF6B00]/40 transition-colors">
              <Printer className="text-[#FF6B00] mb-4" size={32} />
              <h3 className="font-black text-xl uppercase mb-2">3D Printed Parts</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Custom bodies, brackets, and components printed on a Bambu Lab P1S. TPU flex parts, PLA+, and PETG. Precision tolerances for RC fitment.</p>
              <p className="text-[#FF6B00] font-black mt-4 text-sm">Priced per project</p>
            </div>

            <div className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-8 hover:border-[#FF6B00]/40 transition-colors">
              <Hammer className="text-[#FF6B00] mb-4" size={32} />
              <h3 className="font-black text-xl uppercase mb-2">Chassis Mods & Repair</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Electronics installs, ESC programming, connector upgrades, and custom chassis modifications. Arrma, DKS, and more.</p>
              <p className="text-[#FF6B00] font-black mt-4 text-sm">Contact for pricing</p>
            </div>

            <div
              className="border border-zinc-800 bg-zinc-900/30 rounded-2xl p-8 hover:border-[#FF6B00]/40 transition-colors group cursor-pointer"
              onClick={() => window.location.href = 'mailto:paul@apexforgerc.com'}
            >
              <div className="text-[#FF6B00] font-black text-4xl mb-4">?</div>
              <h3 className="font-black text-xl uppercase mb-2">Something Else?</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Have a specific build or idea in mind? Send a message and we'll figure it out.</p>
              <p className="text-[#FF6B00] font-black mt-4 text-sm group-hover:underline">paul@apexforgerc.com →</p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-10 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-black text-xl tracking-tighter uppercase">
            Apex <span className="text-[#FF6B00]">Forge</span> RC
          </span>
          <div className="flex items-center gap-6 text-zinc-500 text-sm font-bold uppercase tracking-widest">
            <a href="mailto:paul@apexforgerc.com" className="hover:text-white transition-colors">Email</a>
            <a href="https://instagram.com/apexforgerc" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://youtube.com/@apexforgerc" className="hover:text-white transition-colors">YouTube</a>
          </div>
          <span className="text-zinc-600 text-xs uppercase tracking-widest">© 2024 Apex Forge RC</span>
        </div>
      </footer>

    </div>
  );
}
