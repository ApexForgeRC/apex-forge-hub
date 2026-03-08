import React from 'react'
import { Package, Wrench } from 'lucide-react'

export default function Inventory() {
  return (
    <div className="animate-fade-in">
      <div className="card text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <Package className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Parts Inventory</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Track RC parts, hardware, consumables, and supplies. 
          Get low stock alerts before you run out.
        </p>
        <div className="flex items-center justify-center gap-2 text-apex-orange">
          <Wrench className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="mt-6 card bg-apex-orange/5 border-apex-orange/20">
        <h3 className="font-semibold text-apex-orange mb-3">Planned Features:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Categorized parts (motors, electronics, hardware, etc.)</li>
          <li>• Quantity tracking with low stock thresholds</li>
          <li>• Supplier links (US-sourced priority)</li>
          <li>• Cost tracking per item</li>
          <li>• Barcode/QR scanning support</li>
          <li>• Reorder reminders</li>
        </ul>
      </div>
    </div>
  )
}
