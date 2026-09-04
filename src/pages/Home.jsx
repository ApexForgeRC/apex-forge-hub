import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Wrench, Printer, Car, Hammer, ArrowUpRight, Package, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-[#080808]/80 backdrop-blur-md border-b border-white/5">
        <span className="font-black text-lg tracking-tighter uppercase">
          Apex <span className="text-[#FF6B00]">Forge</span> RC
        </span>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Services</a>
          <a href="#reforged" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Reforged</a>
          <Link to="/parts" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Parts</Link>
          <a href="mailto:paul@apexforgerc.com" className="group flex items-center gap-2 bg-[#FF6B00] text-black font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider hover:bg-[#FF6B00]/90 transition-all">
            Get a Quote <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-end pb-20 px-8 pt-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#FF6B00] opacity-[0.05] blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF6B00] opacity-[0.03] blur-[120px] rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-6xl">
            <div className="flex items-center gap-3 mb-7">
              <div className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em]">
                Atlanta, Georgia // RC Repair + Rebuild
              </span>
            </div>

            <h1 className="text-[clamp(3.6rem,10vw,8.5rem)] font-black leading-[0.88] tracking-tighter uppercase">
              Repair<span className="text-[#FF6B00]">.</span><br />
              Rebuild<span className="text-[#FF6B00]">.</span><br />
              Reforge<span className="text-[#FF6B00]">.</span>
            </h1>

            <p className="text-zinc-400 text-lg md:text-xl max-w-2xl leading-relaxed mt-8">
              RC repair, restoration, custom rebuilds and fabricated parts. From a broken drivetrain to a full teardown, Apex Forge brings machines back the right way.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a
                href="mailto:paul@apexforgerc.com?subject=RC%20Repair%20Quote"
                className="group flex items-center gap-3 bg-[#FF6B00] text-black font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_40px_rgba(255,107,0,0.25)]"
              >
                Get a Repair Quote
                <ArrowUpRight size={17} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#services"
                className="flex items-center gap-3 bg-white/5 border border-white/10 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                Explore Services
                <ChevronRight size={17} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-10 border-t border-white/5">
            {[
              { value: 'Repair', label: 'Diagnose + Fix' },
              { value: 'Rebuild', label: 'Tear Down + Restore' },
              { value: 'Reforged', label: 'Apex-Built Machines' },
              { value: 'Fabricate', label: '3D Printed Solutions' },
            ].map((stat) => (
              <div key={stat.value}>
                <div className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">{stat.value}</div>
                <div className="text-zinc-600 text-[10px] md:text-xs uppercase tracking-[0.18em] mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="px-8 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">What Apex Forge Does</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Built Around The Work.</h2>
              <p className="text-zinc-500 max-w-2xl mt-4 leading-relaxed">
                No blanket parts cannon. We inspect the vehicle, find the problem, preserve what still works, and build the repair around what the machine actually needs.
              </p>
            </div>
            <a
              href="mailto:paul@apexforgerc.com?subject=RC%20Service%20Inquiry"
              className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
            >
              Start an inquiry <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[330px] hover:border-[#FF6B00]/30 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Wrench className="text-[#FF6B00]" size={24} />
                </div>
                <p className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.25em] mb-3">01 // Repair</p>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Troubleshoot. Repair. Test.</h3>
                <p className="text-zinc-500 leading-relaxed max-w-xl">
                  Drivetrain failures, differentials, electronics, steering, worn components and general RC problems. Diagnosis starts with the failure you actually brought in.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-zinc-400 font-bold text-sm">Job-based pricing // Parts sourced as needed</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[330px] hover:border-[#FF6B00]/30 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Hammer className="text-[#FF6B00]" size={24} />
                </div>
                <p className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.25em] mb-3">02 // Rebuild</p>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Bring The Dead Ones Back.</h3>
                <p className="text-zinc-500 leading-relaxed">
                  Full teardown, inspection, cleaning, replacement of worn or failed parts, reassembly, tuning and test-running for vehicles worth saving.
                </p>
              </div>
              <div className="pt-6 border-t border-white/5 text-zinc-400 font-bold text-sm">
                Restoration // Refresh // Resurrection
              </div>
            </div>

            <div id="reforged" className="md:col-span-5 bg-[#FF6B00] rounded-3xl p-10 flex flex-col justify-between min-h-[290px] text-black group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center mb-6">
                  <Car className="text-black" size={24} />
                </div>
                <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.25em] mb-3">03 // Reforged</p>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Reforged By Apex.</h3>
                <p className="text-black/65 leading-relaxed">
                  Donor and project RCs torn down, rebuilt, upgraded where it matters, tuned and tested before they earn the Apex name.
                </p>
              </div>
              <div className="pt-6 border-t border-black/15 text-sm font-black uppercase tracking-wider">
                Inspected / Rebuilt / Tuned / Tested
              </div>
            </div>

            <div className="md:col-span-7 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[290px] hover:border-[#FF6B00]/30 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Printer className="text-[#FF6B00]" size={24} />
                </div>
                <p className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.25em] mb-3">04 // Fabricate</p>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Print What The Job Needs.</h3>
                <p className="text-zinc-500 leading-relaxed max-w-xl">
                  3D printed brackets, mounts, body components, functional parts and custom solutions in materials selected for the application.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-zinc-400 font-bold text-sm">RC parts // Custom fabrication // Small-run prints</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reforged Showcase */}
      <section id="reforged-showcase" className="px-8 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Apex Reforged</p>
              <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter">Machines With A Second Life.</h2>
              <p className="text-zinc-500 max-w-2xl mt-4 leading-relaxed">
                Reforged builds start with a used, donor, or project platform and earn their way back through teardown, inspection, rebuild, selective upgrades, tuning, and testing.
              </p>
            </div>
            <a href="mailto:paul@apexforgerc.com?subject=Reforged%20Build%20Inquiry" className="text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors flex items-center gap-2">
              Ask about a build <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            <article className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden hover:border-[#FF6B00]/30 transition-colors">
              <div className="aspect-[16/9] bg-[linear-gradient(135deg,#151515,#090909)] border-b border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
                <div className="relative text-center">
                  <Car className="w-12 h-12 text-[#FF6B00] mx-auto mb-3" />
                  <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">Build Photography Placeholder</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.25em]">AF-RF-001 // Showcase Build</span>
                  <span className="text-[10px] font-black uppercase tracking-widest border border-green-500/30 bg-green-500/10 text-green-400 rounded-full px-3 py-1">Running</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Senton Reforged</h3>
                <p className="text-zinc-500 mt-3 leading-relaxed">
                  Long-wheelbase Arrma project assembled from the parts pool and donor platforms. Currently 3S, with future 4S development planned around a tougher differential setup.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-widest">Platform</span>
                    <strong className="text-sm">Arrma Senton</strong>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-widest">Current Power</span>
                    <strong className="text-sm">3S Brushless</strong>
                  </div>
                </div>
              </div>
            </article>

            <article className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden hover:border-[#FF6B00]/30 transition-colors">
              <div className="aspect-[16/9] bg-[linear-gradient(135deg,#151515,#090909)] border-b border-white/5 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,0,0.035)_1px,transparent_1px)] bg-[size:36px_36px]" />
                <div className="relative text-center">
                  <Wrench className="w-12 h-12 text-[#FF6B00] mx-auto mb-3" />
                  <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">Project Photography Placeholder</span>
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.25em]">AF-RF-002 // In Development</span>
                  <span className="text-[10px] font-black uppercase tracking-widest border border-[#FF6B00]/30 bg-[#FF6B00]/10 text-[#FF6B00] rounded-full px-3 py-1">Project</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight">Halfraction 3S</h3>
                <p className="text-zinc-500 mt-3 leading-relaxed">
                  A 3S Halfraction project using the Arrma Vendetta as the donor foundation with existing Infraction body hardware and an intentionally low new-cash build strategy.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-6">
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-widest">Foundation</span>
                    <strong className="text-sm">Arrma Vendetta</strong>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-xl p-4">
                    <span className="block text-zinc-600 text-[10px] uppercase tracking-widest">Target</span>
                    <strong className="text-sm">3S Halfraction</strong>
                  </div>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Shop Gateways */}
      <section id="shop" className="px-8 py-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Parts + Printed Goods</p>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-12">Get What The Project Needs.</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Link to="/parts" className="group bg-[#141414] border border-white/5 rounded-3xl p-10 min-h-[280px] flex flex-col justify-between hover:border-[#FF6B00]/30 transition-all">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Package className="text-[#FF6B00]" size={24} />
                </div>
                <p className="text-[#FF6B00] text-[10px] font-black uppercase tracking-[0.25em] mb-3">Parts Catalog</p>
                <h3 className="text-3xl font-black uppercase tracking-tight">Repair + Rebuild Parts</h3>
                <p className="text-zinc-500 mt-3 max-w-md leading-relaxed">
                  Search the working Arrma parts catalog for repair, rebuild, and project components. Current catalog pricing uses the Apex parts markup model.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
                <span className="font-black uppercase tracking-wider text-sm">Browse Parts</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </Link>

            <a href="https://apexforgemotorsports.etsy.com" target="_blank" rel="noopener noreferrer" className="group bg-[#FF6B00] rounded-3xl p-10 min-h-[280px] flex flex-col justify-between text-black">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center mb-6">
                  <ShoppingBag className="text-black" size={24} />
                </div>
                <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.25em] mb-3">Printed Goods</p>
                <h3 className="text-3xl font-black uppercase tracking-tight">Apex Forge On Etsy</h3>
                <p className="text-black/65 mt-3 max-w-md leading-relaxed">
                  Motorsports, RC, diecast, display, bench, and functional printed products. The catalog will grow as original and commercially licensed designs are ready.
                </p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-black/15 mt-8">
                <span className="font-black uppercase tracking-wider text-sm">Visit Etsy</span>
                <ArrowUpRight size={20} />
              </div>
            </a>
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
