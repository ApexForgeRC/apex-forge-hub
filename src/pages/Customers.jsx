import React from 'react'
import { Users, Wrench } from 'lucide-react'

export default function Customers() {
  return (
    <div className="animate-fade-in">
      <div className="card text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Customer Management</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Track customers, repair jobs, orders, and follow-ups. 
          Simple CRM for your RC business.
        </p>
        <div className="flex items-center justify-center gap-2 text-apex-orange">
          <Wrench className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="mt-6 card bg-apex-orange/5 border-apex-orange/20">
        <h3 className="font-semibold text-apex-orange mb-3">Planned Features:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Customer contact info and notes</li>
          <li>• Order/job history per customer</li>
          <li>• Repair ticket tracking</li>
          <li>• Follow-up reminders</li>
          <li>• Revenue per customer analytics</li>
          <li>• Export to Google Contacts</li>
        </ul>
      </div>
    </div>
  )
}
