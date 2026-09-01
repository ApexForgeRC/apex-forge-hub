import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, Wrench, Printer, Car, Hammer, ArrowUpRight, Store, ShoppingCart, ShieldCheck, Radio, Zap, ImageOff } from 'lucide-react';
import { PRINTS } from '../data/prints';

const ETSY_URL = 'https://apexforgemotorsports.etsy.com';

// Set to '/builds/project-arrma.jpg' (file dropped in /public/builds/) once real photos exist.
const PROJECT_ARRMA_IMAGE = null;

export default function StorefrontHome({ cart, onOpenCart }) {
  const navigate = useNavigate();
  const itemCount = cart?.itemCount ?? 0;

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
          <a href="#shop" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Shop</a>
          <Link to="/parts" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Parts</Link>
          <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white text-xs font-bold uppercase tracking-[0.2em] transition-colors">Etsy</a>
          <button onClick={onOpenCart} className="relative text-zinc-500 hover:text-white transition-colors" aria-label="Open cart">
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#FF6B00] text-black text-[10px] font-black rounded-full w-4 h-4 flex items-center justify-center">{itemCount}</span>
            )}
          </button>
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
              <span className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em]">Atlanta, Georgia // Est. 2024</span>
            </div>

            <h1 className="text-[clamp(4rem,12vw,10rem)] font-black leading-[0.9] tracking-tighter uppercase">
              Built<br />
              Different<span className="text-[#FF6B00]">.</span>
            </h1>

            <p className="text-zinc-400 text-lg max-w-lg leading-relaxed">
              Custom 1/10 scale RC builds, precision 3D printed parts, and chassis work done right the first time — built to your spec, not pulled off a shelf. Atlanta, GA.
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

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

            <div className="md:col-span-7 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Car className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Complete Builds</h3>
                <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">Full 1/10 scale builds, chassis to body — Hobbywing electronics, 3D printed everything else. Take it BND and finish it yourself, or RTR and just drive.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">From $350 BND / $400 RTR</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[320px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Printer className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">3D Printed Parts</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Custom bodies, brackets, mounts — whatever broke or whatever you dreamed up. TPU, PLA+, PETG, printed to fit. Not "close enough."</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Priced per project</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            <div className="md:col-span-5 bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[260px] hover:border-[#FF6B00]/20 transition-all duration-300 group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Hammer className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-3">Chassis Mods & Repair</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">ESC installs, connector upgrades, mods that actually hold up. Arrma and most 1/10 platforms — bring it through the door.</p>
              </div>
              <div className="flex items-center justify-between pt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Contact for pricing</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </div>

            <div
              onClick={() => window.location.href = 'mailto:paul@apexforgerc.com'}
              className="md:col-span-7 bg-[#FF6B00] rounded-3xl p-10 flex flex-col justify-between min-h-[260px] cursor-pointer hover:bg-[#FF6B00]/90 transition-all duration-300 group"
            >
              <div>
                <h3 className="text-3xl font-black uppercase tracking-tight text-black mb-3">Something Custom?</h3>
                <p className="text-black/60 text-sm leading-relaxed max-w-sm">Got a build or a weird one-off idea? Tell me what it is — if it's possible, I'll figure out how.</p>
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

      {/* Builds — Project Arrma */}
      <section id="builds" className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Ready To Sell</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter">Builds</h2>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
            {/* Photo slot — drop a file at /public/builds/project-arrma.jpg and set PROJECT_ARRMA_IMAGE
                above to '/builds/project-arrma.jpg' once the PULUZ shots are ready. Any aspect ratio
                works, it's cropped automatically. */}
            <div className="aspect-video md:aspect-auto bg-[#0f0f0f] flex flex-col items-center justify-center gap-3 border-b md:border-b-0 md:border-r border-white/5 min-h-[280px]">
              {PROJECT_ARRMA_IMAGE ? (
                <img src={PROJECT_ARRMA_IMAGE} alt="Project Arrma build" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Car className="text-zinc-700" size={40} />
                  <span className="text-zinc-700 text-xs uppercase tracking-[0.2em]">Photos coming soon</span>
                </>
              )}
            </div>

            <div className="p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-green-400" />
                  <span className="text-green-400 text-xs font-bold uppercase tracking-[0.2em]">Build Complete — For Sale</span>
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3">Project Arrma</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 max-w-md">
                  Built from spare Arrma parts and a stripped donor chassis — not off a shelf, off the bench. Big Rock drivetrain
                  with a fresh slipper clutch, Vorteks suspension, Infraction chassis, all-Spektrum electronics. 3D printed fenders
                  and rock guards keep debris out of the drivetrain, with a mesh shield over the electronics.
                </p>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {[
                    { icon: Zap, label: 'Drivetrain', value: 'Big Rock + new slipper clutch' },
                    { icon: Wrench, label: 'Suspension', value: 'Vorteks' },
                    { icon: Car, label: 'Chassis', value: 'Infraction' },
                    { icon: Radio, label: 'Electronics', value: 'All Spektrum' },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-start gap-2">
                      <Icon className="text-[#FF6B00] mt-0.5 shrink-0" size={16} />
                      <div>
                        <div className="text-zinc-600 text-[10px] uppercase tracking-[0.2em]">{label}</div>
                        <div className="text-zinc-300 text-sm">{value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <a href={`mailto:paul@apexforgerc.com?subject=${encodeURIComponent('Project Arrma — Inquiry')}`}
                className="group/btn flex items-center justify-center gap-2 w-full bg-[#FF6B00] text-black font-black px-6 py-3.5 rounded-2xl text-sm uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_30px_rgba(255,107,0,0.2)]">
                Inquire About This Build <ArrowUpRight size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Printed Work — gallery, sourced from src/data/prints.js */}
      <section id="prints" className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Printed In-House</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter">3D Printed Work</h2>
            </div>
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
              Full shop on Etsy <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PRINTS.map(item => (
              <a
                key={item.id}
                href={item.link}
                target="_blank" rel="noopener noreferrer"
                className="bg-[#141414] border border-white/5 rounded-3xl overflow-hidden group hover:border-[#FF6B00]/20 transition-all duration-300"
              >
                <div className="aspect-square bg-[#0f0f0f] flex flex-col items-center justify-center gap-2">
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageOff className="text-zinc-700" size={28} />
                      <span className="text-zinc-700 text-[10px] uppercase tracking-[0.2em]">Photo coming soon</span>
                    </>
                  )}
                </div>
                <div className="p-6">
                  <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">{item.category}</span>
                  <h3 className="text-lg font-black uppercase tracking-tight mt-1 mb-1">{item.title}</h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-4">{item.description}</p>
                  <span className="text-[#FF6B00] font-black text-xs uppercase tracking-wider flex items-center gap-1">
                    Shop This <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Shop */}
      <section id="shop" className="px-8 py-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-[#FF6B00] text-xs font-bold uppercase tracking-[0.3em] mb-3">Buy Direct</p>
              <h2 className="text-5xl font-black uppercase tracking-tighter">Shop</h2>
            </div>
            <a href="mailto:info@apexforgerc.com" className="hidden md:flex items-center gap-2 text-zinc-500 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors">
              Custom quote <ArrowUpRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Parts Catalog */}
            <Link
              to="/parts"
              className="bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[260px] hover:border-[#FF6B00]/20 transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Parts Catalog</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Genuine and take-off Arrma parts, sourced in bulk. Growing list, add straight to cart.</p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Browse Parts</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </Link>

            {/* Diecast, Wall Art & Prints — Etsy */}
            <a
              href={ETSY_URL} target="_blank" rel="noopener noreferrer"
              className="bg-[#141414] border border-white/5 rounded-3xl p-10 flex flex-col justify-between min-h-[260px] hover:border-[#FF6B00]/20 transition-all duration-300 group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/10 flex items-center justify-center mb-6">
                  <Store className="text-[#FF6B00]" size={24} />
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Diecast, Wall Art & Prints</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">Display stands, motorsport wall art, and lightbox signs — ready to ship, no build wait. Stocked on Etsy.</p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-white/5">
                <span className="text-[#FF6B00] font-black text-sm">Shop on Etsy</span>
                <ArrowUpRight className="text-zinc-700 group-hover:text-[#FF6B00] transition-colors" size={20} />
              </div>
            </a>

            {/* Fully Custom Quote */}
            <div onClick={() => window.location.href = 'mailto:info@apexforgerc.com'} className="bg-[#FF6B00] rounded-3xl p-10 flex flex-col justify-between min-h-[260px] cursor-pointer hover:bg-[#FF6B00]/90 transition-all duration-300 group">
              <div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-black mb-2">Fully Custom Quote</h3>
                <p className="text-black/60 text-sm leading-relaxed">Don't see exactly what you need? Every build's different. Reach out and we'll spec it out together — no commitment required.</p>
              </div>
              <div className="flex items-center justify-between pt-6 mt-6 border-t border-black/10">
                <span className="text-black font-black text-sm">info@apexforgerc.com</span>
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
            <a href={ETSY_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Etsy</a>
            <a href="https://instagram.com/apexforgerc" className="hover:text-white transition-colors">Instagram</a>
            <a href="https://youtube.com/@apexforgerc" className="hover:text-white transition-colors">YouTube</a>
          </div>
          <span className="text-zinc-700 text-xs uppercase tracking-widest">© 2024 Apex Forge RC</span>
        </div>
      </footer>

    </div>
  );
}
