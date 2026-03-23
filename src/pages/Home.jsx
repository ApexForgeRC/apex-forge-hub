import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Wrench, Zap } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Hero Section - The Lobby Entrance */}
      <div className="relative flex-1 flex flex-col items-center justify-center text-center px-4 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00] opacity-10 blur-[120px] rounded-full" />
        
        <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase mb-4 z-10">
          Apex Forge<span className="text-[#FF6B00]">RC</span>
        </h1>
        
        <p className="max-w-2xl text-zinc-400 text-lg md:text-xl font-medium mb-12 z-10 leading-relaxed uppercase tracking-widest">
          High-Performance 3D Printed Engineering <br/> 
          <span className="text-zinc-600">Woodstock, Georgia // Est. 2024</span>
        </p>

        <div className="flex flex-col md:flex-row gap-6 z-10">
          <button 
            onClick={() => navigate('/jobs')}
            className="group bg-[#FF6B00] text-black font-black px-10 py-5 rounded-full flex items-center gap-3 text-lg hover:scale-105 transition-all shadow-[0_0_30px_rgba(255,107,0,0.3)]"
          >
            START A BUILD <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-white/5 border border-white/10 text-white font-black px-10 py-5 rounded-full flex items-center gap-3 text-lg hover:bg-white/10 transition-all"
          >
            OWNER PORTAL <Wrench size={20} />
          </button>
        </div>
      </div>

      {/* Quick Stats Strip */}
      <div className="border-t border-zinc-800 bg-zinc-900/20 py-12">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-[#FF6B00] font-black text-4xl mb-2 italic">1/10</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Scale Specialist</div>
          </div>
          <div>
            <div className="text-[#FF6B00] font-black text-4xl mb-2 italic flex justify-center items-center gap-2"> 280W</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Precision Power Logic</div>
          </div>
          <div>
            <div className="text-[#FF6B00] font-black text-4xl mb-2 italic">BAMBU</div>
            <div className="text-zinc-500 font-bold uppercase text-xs tracking-widest">Standard Quality</div>
          </div>
        </div>
      </div>
    </div>
  );
}