import React, { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import JobCalculator from './pages/JobCalculator';
import Lab from './pages/Lab';

function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen bg-apex-black overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<AppLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/jobs" element={<JobCalculator />} />
        <Route path="/lab" element={<Lab />} />
      </Route>
    </Routes>
  );
}
