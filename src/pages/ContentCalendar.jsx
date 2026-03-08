import React from 'react'
import { Calendar, Wrench } from 'lucide-react'

export default function ContentCalendar() {
  return (
    <div className="animate-fade-in">
      <div className="card text-center py-16">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-display font-bold mb-3">Content Calendar</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-6">
          Plan your YouTube, Instagram, and TikTok content. 
          Track shoot dates, edit deadlines, and publish schedule.
        </p>
        <div className="flex items-center justify-center gap-2 text-apex-orange">
          <Wrench className="w-5 h-5" />
          <span className="font-medium">Coming Soon</span>
        </div>
      </div>

      <div className="mt-6 card bg-apex-orange/5 border-apex-orange/20">
        <h3 className="font-semibold text-apex-orange mb-3">Planned Features:</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Calendar view with drag-and-drop</li>
          <li>• Platform tags (YouTube, Instagram, TikTok)</li>
          <li>• Status tracking (Idea → Script → Film → Edit → Publish)</li>
          <li>• Link content to builds for series planning</li>
          <li>• Batch recording session planner</li>
          <li>• Sync with Google Calendar</li>
        </ul>
      </div>
    </div>
  )
}
