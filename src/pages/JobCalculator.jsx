import React, { useState } from 'react';
import { Calculator, Zap, Clock, Weight, ChevronDown, Save, ThermometerSnowflake } from 'lucide-react';

export default function JobCalculator() {
  const models = {
    '911GT': { name: 'Porsche 911 GT3 RS', weight: 850, time: 18, labor: 2 },
    'DKS': { name: 'DKS-Basic Frame', weight: 420, time: 9, labor: 1 },
    'Custom': { name: 'Custom Build', weight: 0, time: 0, labor: 1 }
  };

  const [weight, setWeight] = useState(0);
  const [printTime, setPrintTime] = useState(0);
  const [laborTime, setLaborTime] = useState(1);
  const [markup, setMarkup] = useState(150);

  // REAL WOODSTOCK DATA
  const FILAMENT_KG = 24.99; 
  const LABOR_HR = 25.00;
  const GA_POWER_RATE = 0.18; // Based on your $5.54/31kWh day
  const BAMBU_WATTAGE = 280; // Normal speed average

  const handleLoad = (key) => {
    if (key === 'Custom') return;
    setWeight(models[key].weight);
    setPrintTime(models[key].time);
    setLaborTime(models[key].labor);
  };

  const matCost = (weight / 1000) * FILAMENT_KG;
  const labCost = laborTime * LABOR_HR;
  const pwrCost = (BAMBU_WATTAGE / 1000) * printTime * GA_POWER_RATE;
  const base = matCost + labCost + pwrCost;
  const total = base + (base * (markup / 100));

  return (
    <div className="p-8 bg-black text-white min-h-screen font-sans">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10 border-b border-zinc-800 pb-6">
          <h1 className="text-4xl font-black text-[#FF6B00] italic tracking-tighter">APEX FORGE RC</h1>
          <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-2 rounded-lg flex items-center gap-2 text-blue-400 text-xs font-bold">
            <ThermometerSnowflake size={14} /> WINTER RATE ACTIVE ($0.18/kWh)
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-8 bg-zinc-900/40 p-8 rounded-3xl border border-zinc-800">
            <div>
              <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4 block">Quick-Load Project</label>
              <select onChange={(e) => handleLoad(e.target.value)} className="w-full bg-black border-2 border-zinc-800 p-4 rounded-xl font-bold text-lg focus:border-[#FF6B00] outline-none transition-all">
                <option value="Custom">-- SELECT MODEL --</option>
                <option value="911GT">Porsche 911 GT3 RS</option>
                <option value="DKS">DKS-Basic Frame</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black text-zinc-500 mb-2 block uppercase">Filament (g)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-xl font-black focus:border-[#FF6B00] outline-none" />
              </div>
              <div>
                <label className="text-[10px] font-black text-zinc-500 mb-2 block uppercase">Print Time (h)</label>
                <input type="number" value={printTime} onChange={(e) => setPrintTime(e.target.value)} className="w-full bg-black border border-zinc-700 p-4 rounded-xl text-xl font-black focus:border-[#FF6B00] outline-none" />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-black text-zinc-500 mb-2 block uppercase">Profit Markup %</label>
              <input type="range" min="50" max="500" value={markup} onChange={(e) => setMarkup(e.target.value)} className="w-full accent-[#FF6B00] h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
              <div className="text-right font-black text-[#FF6B00] mt-2">{markup}%</div>
            </div>
          </div>

          <div className="bg-[#FF6B00] text-black p-10 rounded-[3rem] shadow-[0_0_50px_rgba(255,107,0,0.15)] flex flex-col justify-between">
            <div>
              <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 opacity-70">Total Build Quote</h2>
              <div className="text-[6rem] font-black leading-none tracking-tighter mb-10">${total.toFixed(2)}</div>
              
              <div className="space-y-4 border-t-2 border-black/10 pt-8">
                <div className="flex justify-between font-bold uppercase text-xs"><span>Materials</span><span>${matCost.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold uppercase text-xs"><span>Power Draw</span><span>${pwrCost.toFixed(2)}</span></div>
                <div className="flex justify-between font-bold uppercase text-xs"><span>Labor</span><span>${labCost.toFixed(2)}</span></div>
              </div>
            </div>

            <button className="w-full bg-black text-white font-black py-6 rounded-2xl mt-10 flex items-center justify-center gap-3 uppercase tracking-widest hover:scale-[1.02] transition-transform">
              <Save size={20} /> Record Project
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}