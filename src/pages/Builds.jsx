import React from 'react'
import { Wrench } from 'lucide-react'

export default function Builds() {
  return (
    <div className="animate-fade-in">
      <div className="card text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Wrench className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Build Projects</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Track your active builds like the AMG GT63 and Explorer MK1. 
          Manage stages, parts needed, and costs.
        </p>
        <div className="flex items-center justify-center gap-2 text-apex-orange">
          <Wrench className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="mt-6 card bg-apex-orange/5 border-apex-orange/20">
        <h3 className="font-semibold text-apex-orange mb-3">Planned Features:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Project stages with progress tracking</li>
          <li>• Parts checklist per build</li>
          <li>• Cost accumulation from filament + parts</li>
          <li>• Photo documentation</li>
          <li>• Notes and mod tracking</li>
          <li>• Link builds to content calendar for video planning</li>
        </ul>
      </div>
    </div>
  )
}
