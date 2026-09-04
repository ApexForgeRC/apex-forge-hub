import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import OwnerLayout from './components/OwnerLayout'

import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import FilamentTracker from './pages/FilamentTracker'
import JobCalculator from './pages/JobCalculator'
import Inventory from './pages/Inventory'
import Builds from './pages/Builds'
import Customers from './pages/Customers'
import ContentCalendar from './pages/ContentCalendar'
import Expenses from './pages/Expenses'
import PrinterLog from './pages/PrinterLog'
import Lab from './pages/Lab'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route element={<OwnerLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/filament" element={<FilamentTracker />} />
        <Route path="/jobs" element={<JobCalculator />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/builds" element={<Builds />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/content" element={<ContentCalendar />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/printer" element={<PrinterLog />} />
        <Route path="/lab" element={<Lab />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
