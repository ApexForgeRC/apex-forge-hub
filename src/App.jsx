import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import FilamentTracker from './pages/FilamentTracker'
import JobCalculator from './pages/JobCalculator'
import Inventory from './pages/Inventory'
import Builds from './pages/Builds'
import Customers from './pages/Customers'
import ContentCalendar from './pages/ContentCalendar'
import Expenses from './pages/Expenses'
import PrinterLog from './pages/PrinterLog'

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-apex-black text-white flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/filament" element={<FilamentTracker />} />
            <Route path="/jobs" element={<JobCalculator />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/builds" element={<Builds />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/content" element={<ContentCalendar />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/printer" element={<PrinterLog />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
