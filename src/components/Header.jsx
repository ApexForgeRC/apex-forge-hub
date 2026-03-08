import React from 'react'
import { useLocation } from 'react-router-dom'
import { Menu, Bell, Settings } from 'lucide-react'

const pageTitles = {
  '/': 'Dashboard',
  '/filament': 'Filament Tracker',
  '/jobs': 'Job Calculator',
  '/inventory': 'Parts Inventory',
  '/builds': 'Build Projects',
  '/customers': 'Customers',
  '/content': 'Content Calendar',
  '/expenses': 'Expenses',
  '/printer': 'Printer Log',
}

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const title = pageTitles[location.pathname] || 'Dashboard'

  return (
    <header className="h-16 bg-apex-dark/80 backdrop-blur-sm border-b border-white/5 flex items-center justify-between px-4 sticky top-0 z-30">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-white/5 rounded-lg"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-display font-semibold">{title}</h2>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2">
        <button className="p-2 hover:bg-white/5 rounded-lg relative">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-apex-orange rounded-full" />
        </button>
        <button className="p-2 hover:bg-white/5 rounded-lg">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </header>
  )
}
