import React from 'react';
import { BookOpen, PenTool, Layers, ExternalLink, Code } from 'lucide-react';

export default function Lab() {
  const guides = [
    {
      title: "Fusion 360: 30-Day Masterclass",
      author: "Kevin Kennedy",
      desc: "The gold standard for learning CAD. Perfect for designing original RC chassis parts.",
      tag: "Learning",
      link: "https://www.youtube.com/watch?v=4G2E_DqQteM"
    },
    {
      title: "Material Science: PETG-CF",
      author: "Apex Forge",
      desc: "Why Carbon Fiber PETG is the only choice for motor mounts and structural braces.",
      tag: "Materials",
      link: "#"
    },
    {
      title: "Mechanical Tolerances",
      author: "Engineering Ref",
      desc: "Guide to M3/M4 screw fitment for 3D prints (Bridges vs. Holes).",
      tag: "Reference",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#E8E8E8] p-8 space-y-12 animate-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero Header */}
      <div className="border-b border-zinc-800 pb-12 text-center md:text-left">
        <h1 className="text-6xl font-black italic tracking-tighter uppercase text-[#FF6B00]">Design Lab</h1>
        <p className="text-zinc-500 font-bold uppercase text-sm tracking-[0.3em] mt-2">
          Engineering // Prototyping // Original Motorworks
        </p>
      </div>

      {/* Lab Sections */}
      <div className="grid lg:grid-cols-3 gap-8">
        {guides.map((guide, i) => (
          <div key={i} className="bg-[#141414] border border-zinc-800 rounded-[2rem] p-8 hover:border-[#FF6B00]/40 transition-all group">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-black text-[#FF6B00] text-[10px] font-black uppercase px-3 py-1 rounded-full border border-zinc-800">
                {guide.tag}
              </span>
              <BookOpen size={18} className="text-zinc-600 group-hover:text-[#FF6B00] transition-colors" />
            </div>
            <h3 className="text-2xl font-black italic uppercase leading-none mb-4">{guide.title}</h3>
            <p className="text-zinc-400 text-sm font-medium mb-8 leading-relaxed italic">{guide.desc}</p>
            <a 
              href={guide.link} 
              target="_blank" 
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#FF6B00] hover:translate-x-2 transition-transform"
            >
              Access Resource <ExternalLink size={14} />
            </a>
          </div>
        ))}
      </div>

      {/* Future Roadmap Note */}
      <div className="bg-[#FF6B00]/5 border border-[#FF6B00]/20 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-8">
        <div className="p-6 bg-black rounded-full border border-[#FF6B00]/30 text-[#FF6B00]">
          <PenTool size={32} />
        </div>
        <div>
          <h4 className="text-xl font-black italic uppercase">The Drafting Board</h4>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-wide">
            Coming April 2026: Apex Forge Belt Conversion Kit Blueprints & CAD Walkthroughs.
          </p>
        </div>
      </div>
    </div>
  );
}