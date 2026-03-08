import React from 'react'
import { Link } from 'react-router-dom'
import { 
  Cylinder, 
  Calculator, 
  Package, 
  Wrench, 
  Users, 
  Calendar,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign
} from 'lucide-react'

export default function Dashboard() {
  // Mock data - will be replaced with real data from localStorage/Supabase
  const stats = {
    activeBuildds: 2,
    lowStockItems: 3,
    pendingJobs: 5,
    monthlyRevenue: 847.50,
  }

  const quickLinks = [
    { path: '/filament', icon: Cylinder, label: 'Log Print', color: 'from-orange-500 to-red-500' },
    { path: '/jobs', icon: Calculator, label: 'New Quote', color: 'from-blue-500 to-cyan-500' },
    { path: '/inventory', icon: Package, label: 'Check Stock', color: 'from-green-500 to-emerald-500' },
    { path: '/builds', icon: Wrench, label: 'Update Build', color: 'from-purple-500 to-pink-500' },
  ]

  const recentActivity = [
    { type: 'print', message: 'Logged print: Explorer MK1 Motor Mount', time: '2 hours ago' },
    { type: 'job', message: 'New quote created: Custom chassis repair', time: '5 hours ago' },
    { type: 'inventory', message: 'Low stock alert: M3x10 screws', time: '1 day ago' },
    { type: 'content', message: 'Video scheduled: Belt Drive Conversion', time: '2 days ago' },
  ]

  const activeBuilds = [
    { name: 'AMG GT63 on DKS-Basic', status: 'In Progress', progress: 85 },
    { name: 'Explorer MK1 Build', status: 'Parts Ordered', progress: 25 },
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-apex-orange/20 to-apex-orange-dark/10 border border-apex-orange/20 rounded-2xl p-6">
        <h1 className="text-2xl font-display font-bold mb-2">Welcome back, Paul</h1>
        <p className="text-gray-400">Here's what's happening at Apex Forge today.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card stagger-1 opacity-0 animate-fade-in">
          <Wrench className="w-8 h-8 text-apex-orange" />
          <span className="stat-value">{stats.activeBuildds}</span>
          <span className="stat-label">Active Builds</span>
        </div>
        <div className="stat-card stagger-2 opacity-0 animate-fade-in">
          <AlertTriangle className="w-8 h-8 text-yellow-500" />
          <span className="stat-value text-yellow-500">{stats.lowStockItems}</span>
          <span className="stat-label">Low Stock Items</span>
        </div>
        <div className="stat-card stagger-3 opacity-0 animate-fade-in">
          <Clock className="w-8 h-8 text-blue-500" />
          <span className="stat-value text-blue-500">{stats.pendingJobs}</span>
          <span className="stat-label">Pending Jobs</span>
        </div>
        <div className="stat-card stagger-4 opacity-0 animate-fade-in">
          <DollarSign className="w-8 h-8 text-green-500" />
          <span className="stat-value text-green-500">${stats.monthlyRevenue}</span>
          <span className="stat-label">This Month</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group card hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <link.icon className="w-6 h-6 text-white" />
              </div>
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Active Builds */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Active Builds</h3>
            <Link to="/builds" className="text-sm text-apex-orange hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {activeBuilds.map((build, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>{build.name}</span>
                  <span className="text-gray-400">{build.progress}%</span>
                </div>
                <div className="h-2 bg-apex-black rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-apex-orange to-apex-orange-light rounded-full transition-all duration-500"
                    style={{ width: `${build.progress}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{build.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <div className="w-2 h-2 rounded-full bg-apex-orange mt-1.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">{activity.message}</p>
                  <p className="text-gray-600 text-xs">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming Content */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-apex-orange" />
            Upcoming Content
          </h3>
          <Link to="/content" className="text-sm text-apex-orange hover:underline">View Calendar</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-apex-black/50 rounded-lg p-4 border border-white/5">
            <span className="badge badge-orange mb-2">YouTube</span>
            <h4 className="font-medium mb-1">Belt Drive Conversion Guide</h4>
            <p className="text-xs text-gray-500">Scheduled: Mar 12</p>
          </div>
          <div className="bg-apex-black/50 rounded-lg p-4 border border-white/5">
            <span className="badge badge-blue mb-2">Instagram</span>
            <h4 className="font-medium mb-1">Explorer MK1 Teaser</h4>
            <p className="text-xs text-gray-500">Scheduled: Mar 10</p>
          </div>
          <div className="bg-apex-black/50 rounded-lg p-4 border border-white/5">
            <span className="badge badge-green mb-2">TikTok</span>
            <h4 className="font-medium mb-1">Quick Print Timelapse</h4>
            <p className="text-xs text-gray-500">Draft</p>
          </div>
        </div>
      </div>
    </div>
  )
}
