import React, { useMemo } from 'react'
import {
  AlertTriangle,
  Boxes,
  CircleDollarSign,
  Package,
  Printer,
  Wrench,
} from 'lucide-react'

const loadFromStorage = (key, defaultValue = []) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch {
    return defaultValue
  }
}

const formatMoney = (value) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value || 0)

export default function Dashboard() {
  const builds = loadFromStorage('afrc_builds', [])
  const inventory = loadFromStorage('afrc_inventory', [])
  const spools = loadFromStorage('afrc_spools', [])
  const prints = loadFromStorage('afrc_prints', [])

  const dashboard = useMemo(() => {
    const activeBuilds = builds.filter(build => build.stage !== 'complete' && build.stage !== 'completed')
    const latestBuild = [...activeBuilds]
      .sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))[0]

    const inventoryValue = inventory.reduce(
      (sum, item) => sum + ((Number(item.cost) || 0) * (Number(item.quantity) || 0)),
      0,
    )

    const lowStockItems = inventory.filter(
      item =>
        Number(item.lowStockThreshold) > 0 &&
        Number(item.quantity) <= Number(item.lowStockThreshold),
    )

    const totalFilamentG = spools.reduce(
      (sum, spool) => sum + (Number(spool.remainingWeightG) || 0),
      0,
    )

    const lowSpools = spools.filter(spool => {
      const initial = Number(spool.initialWeightG) || 0
      const remaining = Number(spool.remainingWeightG) || 0
      return initial > 0 && (remaining / initial) * 100 < 20
    })

    const recentPrints = [...prints].slice(0, 5)

    return {
      activeBuilds,
      latestBuild,
      inventoryValue,
      lowStockItems,
      totalFilamentG,
      lowSpools,
      recentPrints,
    }
  }, [builds, inventory, spools, prints])

  const stats = [
    {
      label: 'Active Builds',
      value: dashboard.activeBuilds.length,
      sub: dashboard.latestBuild ? dashboard.latestBuild.name : 'No active build',
      icon: Wrench,
    },
    {
      label: 'Inventory Value',
      value: formatMoney(dashboard.inventoryValue),
      sub: `${inventory.length} tracked items`,
      icon: CircleDollarSign,
    },
    {
      label: 'Low Stock',
      value: dashboard.lowStockItems.length + dashboard.lowSpools.length,
      sub: `${dashboard.lowStockItems.length} parts • ${dashboard.lowSpools.length} spools`,
      icon: AlertTriangle,
    },
    {
      label: 'Filament Remaining',
      value: `${(dashboard.totalFilamentG / 1000).toFixed(1)} kg`,
      sub: `${spools.length} tracked spools`,
      icon: Printer,
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-apex-orange text-xs font-bold uppercase tracking-[0.25em]">Apex Forge RC</p>
          <h1 className="text-4xl font-display font-bold tracking-tight mt-1">Owner Dashboard</h1>
          <p className="text-gray-500 mt-2">Live snapshot from your local build, inventory, and filament trackers.</p>
        </div>
        <div className="text-xs uppercase tracking-widest text-gray-500">
          Local operations data
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon }) => (
          <div key={label} className="card">
            <div className="flex items-center justify-between mb-5">
              <div className="w-10 h-10 rounded-xl bg-apex-orange/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-apex-orange" />
              </div>
            </div>
            <div className="text-3xl font-bold font-mono">{value}</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 mt-2">{label}</div>
            <div className="text-xs text-apex-orange mt-2 truncate">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-widest">Current Focus</p>
              <h2 className="text-xl font-semibold mt-1">
                {dashboard.latestBuild?.name || 'No active build'}
              </h2>
            </div>
            <Package className="w-5 h-5 text-apex-orange" />
          </div>

          {dashboard.latestBuild ? (
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-apex-black/60 rounded-xl p-4 border border-white/5">
                <div className="text-xs text-gray-500 uppercase mb-1">Stage</div>
                <div className="font-semibold capitalize">{dashboard.latestBuild.stage || 'Unknown'}</div>
              </div>
              <div className="bg-apex-black/60 rounded-xl p-4 border border-white/5">
                <div className="text-xs text-gray-500 uppercase mb-1">Chassis</div>
                <div className="font-semibold">{dashboard.latestBuild.chassis || '—'}</div>
              </div>
              <div className="bg-apex-black/60 rounded-xl p-4 border border-white/5">
                <div className="text-xs text-gray-500 uppercase mb-1">Body</div>
                <div className="font-semibold">{dashboard.latestBuild.body || '—'}</div>
              </div>
            </div>
          ) : (
            <div className="bg-apex-black/50 border border-dashed border-white/10 rounded-xl p-8 text-center text-gray-500">
              Create a build in Build Projects and it will appear here automatically.
            </div>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-5">
            <Boxes className="w-5 h-5 text-apex-orange" />
            <h2 className="text-lg font-semibold">Attention Needed</h2>
          </div>

          <div className="space-y-3">
            {dashboard.lowStockItems.length === 0 && dashboard.lowSpools.length === 0 ? (
              <div className="text-sm text-gray-500 bg-apex-black/50 rounded-xl p-4">
                No low-stock alerts.
              </div>
            ) : (
              <>
                {dashboard.lowStockItems.slice(0, 4).map(item => (
                  <div key={item.id} className="flex items-center justify-between gap-3 bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{item.name}</div>
                      <div className="text-xs text-gray-500">Parts inventory</div>
                    </div>
                    <span className="badge badge-red">{item.quantity} left</span>
                  </div>
                ))}
                {dashboard.lowSpools.slice(0, 4).map(spool => (
                  <div key={spool.id} className="flex items-center justify-between gap-3 bg-red-500/5 border border-red-500/20 rounded-xl p-3">
                    <div className="min-w-0">
                      <div className="text-sm font-medium truncate">{spool.name}</div>
                      <div className="text-xs text-gray-500">{spool.material}</div>
                    </div>
                    <span className="badge badge-red">
                      {Math.round(Number(spool.remainingWeightG) || 0)}g
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-5">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-widest">Recent Activity</p>
            <h2 className="text-lg font-semibold mt-1">Recent Prints</h2>
          </div>
          <Printer className="w-5 h-5 text-apex-orange" />
        </div>

        {dashboard.recentPrints.length === 0 ? (
          <div className="text-sm text-gray-500 bg-apex-black/50 rounded-xl p-4">
            No prints logged yet.
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {dashboard.recentPrints.map(print => (
              <div key={print.id} className="py-3 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <div className="font-medium truncate">{print.name}</div>
                  <div className="text-xs text-gray-500">
                    {print.material} • {print.weightG}g • {print.date}
                  </div>
                </div>
                <div className="text-apex-orange font-mono font-semibold">
                  {Number(print.cost || 0).toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
