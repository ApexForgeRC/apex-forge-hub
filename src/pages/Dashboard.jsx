import React from 'react';
import { Zap, Package, TrendingUp, AlertTriangle, Database, Droplets } from 'lucide-react';

export default function Dashboard() {
  // Filament Inventory Data
  const filamentStock = [
    { type: 'PETG-CF', brand: 'Bambu Lab', color: 'Black', amount: 850, total: 1000, colorCode: '#FF6B00' },
    { type: 'PLA Plus', brand: 'eSun', color: 'Forge Orange', amount: 200, total: 1000, colorCode: '#FF6B00' },
    { type: 'TPU 95A', brand: 'Overture', color: 'Black', amount: 600, total: 1000, colorCode: '#E8E8E8' },
    { type: 'ASA', brand: 'Polymaker', color: 'Grey', amount: 950, total: 1000, colorCode: '#555555' },
  ];

  const stats = [
    { label: 'Active Builds', value: '1', sub: 'Porsche 911 GT3 RS', icon: <Package className="text-[#FF6B00]" /> },
    { label: 'Power Usage', value: '31 kWh', sub: 'North GA Winter Rate', icon: <Zap className="text-yellow-400" /> },
    { label: 'Total Inventory', value: '2.6 kg', sub: 'Across 4 Spools', icon: <Database className="text-blue-400" /> },
    { label: 'Shop Temp', value: '68°F', sub: 'Optimal for P1S', icon: <AlertTriangle className="text-orange-400" /> },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#E8E8E8] p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header - Updated Branding */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-[#FF6B00]">Owner Portal</h1>
          <p className="text-zinc-500 font-bold uppercase text-xs tracking-[0.2em] mt-1">
            Apex Forge — Original Motorworks // North Georgia // Atlanta Hub
          </p>
        </div>
        <div className="bg-[#141414] border border-zinc-800 px-6 py-3 rounded-2xl flex items-center gap-4">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs font-black uppercase tracking-widest">P1S Status: Ready to Print</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-[#141414] border border-zinc-800 p-6 rounded-3xl hover:border-[#FF6B00]/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-black rounded-2xl border border-zinc-800">{stat.icon}</div>
            </div>
            <div className="text-3xl font-black italic">{stat.value}</div>
            <div className="text-zinc-500 text-[10px] font-black uppercase tracking-widest mt-1">{stat.label}</div>
            <div className="text-[#FF6B00] text-[10px] font-bold mt-2 opacity-80">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Filament Gas Gauges */}
        <div className="lg:col-span-2 bg-[#141414] border border-zinc-800 rounded-[2.5rem] p-8">
          <h3 className="text-lg font-black uppercase tracking-widest mb-6 flex items-center gap-3 italic">
            <Droplets size={20} className="text-[#FF6B00]" /> Filament Inventory
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filamentStock.map((spool, i) => {
              const percentage = (spool.amount / spool.total) * 100;
              const isLow = percentage < 25;
              return (
                <div key={i} className="bg-black/40 border border-zinc-800/50 p-5 rounded-2xl">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <div className="text-sm font-black italic uppercase tracking-tight">{spool.type}</div>
                      <div className="text-[10px] text-zinc-500 font-bold uppercase">{spool.brand} // {spool.color}</div>
                    </div>
                    <div className={`text-sm font-black italic ${isLow ? 'text-red-500 animate-pulse' : 'text-[#FF6B00]'}`}>
                      {spool.amount}g
                    </div>
                  </div>
                  <div className="h-3 w-full bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <div 
                      className={`h-full transition-all duration-1000 ${isLow ? 'bg-red-500' : 'bg-[#FF6B00]'}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  {isLow && <div className="text-[9px] font-black text-red-500 uppercase mt-2 tracking-widest">Low Stock - Order Spool</div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Build Focus Card */}
        <div className="bg-[#FF6B00] rounded-[2.5rem] p-8 text-black flex flex-col justify-between">
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest mb-2 opacity-70 italic text-black">Current Focus</h3>
            <div className="text-4xl font-black italic tracking-tighter leading-none mb-4 uppercase">Porsche GT3 RS</div>
            <p className="text-sm font-bold leading-tight opacity-80 uppercase italic">Finish 95% complete body print. Prep DKS-Basic chassis for assembly.</p>
          </div>
          <div className="mt-8 pt-8 border-t border-black/20">
             <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Surgery Countdown</div>
             <div className="text-2xl font-black italic tracking-tighter">MARCH 16 // T-48H</div>
          </div>
        </div>
      </div>
    </div>
  );
}