import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Cylinder, 
  Calculator, 
  Package, 
  Wrench, 
  Users, 
  Calendar, 
  Receipt, 
  Printer,
  X,
  Zap
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/filament', icon: Cylinder, label: 'Filament Tracker' },
  { path: '/jobs', icon: Calculator, label: 'Job Calculator' },
  { path: '/inventory', icon: Package, label: 'Parts Inventory' },
  { path: '/builds', icon: Wrench, label: 'Build Projects' },
  { path: '/customers', icon: Users, label: 'Customers' },
  { path: '/content', icon: Calendar, label: 'Content Calendar' },
  { path: '/expenses', icon: Receipt, label: 'Expenses' },
  { path: '/printer', icon: Printer, label: 'Printer Log' },
]

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-64 bg-apex-dark border-r border-white/5
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-apex-orange to-apex-orange-dark flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-lg tracking-wide">AFRC</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Operations Hub</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                transition-all duration-200
                ${isActive 
                  ? 'bg-apex-orange/15 text-apex-orange border-l-2 border-apex-orange' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent'
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="text-xs text-gray-600 text-center">
            <p>Apex Forge RC</p>
            <p className="text-gray-700">Original Motorworks</p>
          </div>
        </div>
      </aside>
    </>
  )
}
