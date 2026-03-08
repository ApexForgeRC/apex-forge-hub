import React from 'react'
import { Printer, Wrench } from 'lucide-react'

export default function PrinterLog() {
  return (
    <div className="animate-fade-in">
      <div className="card text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
          <Printer className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Printer Dashboard</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Track P1S maintenance, nozzle changes, print hours, and upkeep. 
          Keep your printer running smooth.
        </p>
        <div className="flex items-center justify-center gap-2 text-apex-orange">
          <Wrench className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="mt-6 card bg-apex-orange/5 border-apex-orange/20">
        <h3 className="font-semibold text-apex-orange mb-3">Planned Features:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Total print hours tracking</li>
          <li>• Nozzle change log with reminders</li>
          <li>• Bed maintenance schedule</li>
          <li>• Firmware version tracking</li>
          <li>• Failed print log for troubleshooting</li>
          <li>• Consumables tracking (nozzles, PEI sheets, etc.)</li>
        </ul>
      </div>
    </div>
  )
}
