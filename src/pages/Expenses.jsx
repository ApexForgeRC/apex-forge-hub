import React from 'react'
import { Receipt, Wrench } from 'lucide-react'

export default function Expenses() {
  return (
    <div className="animate-fade-in">
      <div className="card text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
          <Receipt className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Expense Tracker</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Log business purchases, categorize expenses, and export for taxes. 
          Keep Apex Forge financials organized.
        </p>
        <div className="flex items-center justify-center gap-2 text-apex-orange">
          <Wrench className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="mt-6 card bg-apex-orange/5 border-apex-orange/20">
        <h3 className="font-semibold text-apex-orange mb-3">Planned Features:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Quick expense entry with categories</li>
          <li>• Categories: Filament, Parts, Tools, Shipping, etc.</li>
          <li>• Receipt photo upload</li>
          <li>• Monthly/yearly summaries</li>
          <li>• Export to CSV for accounting</li>
          <li>• Tax category tagging</li>
        </ul>
      </div>
    </div>
  )
}
