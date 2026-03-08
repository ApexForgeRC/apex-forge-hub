import React, { useState, useEffect } from 'react'
import { Wrench, Plus, Trash2, ChevronDown, ChevronUp, Package, DollarSign, Clock, CheckCircle, Circle, Edit3, X, Save } from 'lucide-react'

const loadFromStorage = (key, defaultValue) => {
  try {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : defaultValue
  } catch {
    return defaultValue
  }
}

const saveToStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

const STAGES = [
  { id: 'planning', label: 'Planning', color: 'bg-gray-500' },
  { id: 'parts_ordered', label: 'Parts Ordered', color: 'bg-yellow-500' },
  { id: 'parts_received', label: 'Parts Received', color: 'bg-blue-500' },
  { id: 'printing', label: 'Printing', color: 'bg-purple-500' },
  { id: 'assembly', label: 'Assembly', color: 'bg-orange-500' },
  { id: 'testing', label: 'Testing', color: 'bg-cyan-500' },
  { id: 'complete', label: 'Complete', color: 'bg-green-500' },
]

const CHASSIS_TYPES = [
  'DKS-Basic (Belt Drive)',
  'DKS-Basic (Stock)',
  'GCZ Explorer MK1',
  'TT-02',
  'Custom Chassis',
  'Other',
]

export default function Builds() {
  const [builds, setBuilds] = useState(() => loadFromStorage('afrc_builds', []))
  const [expandedBuild, setExpandedBuild] = useState(null)
  const [showNewBuild, setShowNewBuild] = useState(false)
  const [editingBuild, setEditingBuild] = useState(null)
  
  // New build form
  const [newBuildName, setNewBuildName] = useState('')
  const [newBuildChassis, setNewBuildChassis] = useState('')
  const [newBuildBody, setNewBuildBody] = useState('')
  const [newBuildNotes, setNewBuildNotes] = useState('')
  
  // New part form
  const [showPartForm, setShowPartForm] = useState(null)
  const [newPartName, setNewPartName] = useState('')
  const [newPartCost, setNewPartCost] = useState('')
  const [newPartStatus, setNewPartStatus] = useState('needed')

  useEffect(() => { saveToStorage('afrc_builds', builds) }, [builds])

  const createBuild = () => {
    if (!newBuildName) return
    
    const newBuild = {
      id: Date.now(),
      name: newBuildName,
      chassis: newBuildChassis,
      body: newBuildBody,
      notes: newBuildNotes,
      stage: 'planning',
      parts: [],
      filamentUsed: 0,
      filamentCost: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    setBuilds([newBuild, ...builds])
    setNewBuildName('')
    setNewBuildChassis('')
    setNewBuildBody('')
    setNewBuildNotes('')
    setShowNewBuild(false)
    setExpandedBuild(newBuild.id)
  }

  const updateBuildStage = (buildId, stage) => {
    setBuilds(builds.map(b => 
      b.id === buildId 
        ? { ...b, stage, updatedAt: new Date().toISOString() }
        : b
    ))
  }

  const deleteBuild = (buildId) => {
    if (confirm('Delete this build and all its parts?')) {
      setBuilds(builds.filter(b => b.id !== buildId))
      if (expandedBuild === buildId) setExpandedBuild(null)
    }
  }

  const addPart = (buildId) => {
    if (!newPartName) return
    
    const newPart = {
      id: Date.now(),
      name: newPartName,
      cost: parseFloat(newPartCost) || 0,
      status: newPartStatus,
    }
    
    setBuilds(builds.map(b => 
      b.id === buildId 
        ? { ...b, parts: [...b.parts, newPart], updatedAt: new Date().toISOString() }
        : b
    ))
    
    setNewPartName('')
    setNewPartCost('')
    setNewPartStatus('needed')
    setShowPartForm(null)
  }

  const updatePartStatus = (buildId, partId, status) => {
    setBuilds(builds.map(b => 
      b.id === buildId 
        ? { 
            ...b, 
            parts: b.parts.map(p => p.id === partId ? { ...p, status } : p),
            updatedAt: new Date().toISOString()
          }
        : b
    ))
  }

  const deletePart = (buildId, partId) => {
    setBuilds(builds.map(b => 
      b.id === buildId 
        ? { ...b, parts: b.parts.filter(p => p.id !== partId) }
        : b
    ))
  }

  const updateFilamentUsage = (buildId, grams, cost) => {
    setBuilds(builds.map(b => 
      b.id === buildId 
        ? { ...b, filamentUsed: grams, filamentCost: cost }
        : b
    ))
  }

  const getProgress = (build) => {
    const stageIndex = STAGES.findIndex(s => s.id === build.stage)
    return Math.round(((stageIndex + 1) / STAGES.length) * 100)
  }

  const getTotalCost = (build) => {
    const partsCost = build.parts.reduce((sum, p) => sum + (p.cost || 0), 0)
    return partsCost + (build.filamentCost || 0)
  }

  const activeBuilds = builds.filter(b => b.stage !== 'complete')
  const completedBuilds = builds.filter(b => b.stage === 'complete')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold">Build Projects</h1>
          <p className="text-gray-500 text-sm">Track your RC builds from start to finish</p>
        </div>
        <button
          onClick={() => setShowNewBuild(!showNewBuild)}
          className={`btn ${showNewBuild ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}
        >
          {showNewBuild ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showNewBuild ? 'Cancel' : 'New Build'}
        </button>
      </div>

      {/* Quick Stats */}
      {builds.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="stat-card">
            <span className="stat-label">Active Builds</span>
            <span className="stat-value">{activeBuilds.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <span className="stat-value text-green-400">{completedBuilds.length}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Total Invested</span>
            <span className="stat-value">${builds.reduce((sum, b) => sum + getTotalCost(b), 0).toFixed(0)}</span>
          </div>
        </div>
      )}

      {/* New Build Form */}
      {showNewBuild && (
        <div className="card border-apex-orange/30">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Wrench className="w-5 h-5 text-apex-orange" />
            New Build Project
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs text-gray-500 uppercase block mb-2">Build Name *</label>
              <input
                type="text"
                placeholder="e.g., DKS-Basic Belt Drive Build"
                value={newBuildName}
                onChange={(e) => setNewBuildName(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Chassis</label>
              <select
                value={newBuildChassis}
                onChange={(e) => setNewBuildChassis(e.target.value)}
                className="w-full"
              >
                <option value="">Select chassis...</option>
                {CHASSIS_TYPES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Body</label>
              <input
                type="text"
                placeholder="e.g., Cormango AMG GT63"
                value={newBuildBody}
                onChange={(e) => setNewBuildBody(e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="text-xs text-gray-500 uppercase block mb-2">Notes</label>
              <textarea
                placeholder="Build goals, mods planned, etc..."
                value={newBuildNotes}
                onChange={(e) => setNewBuildNotes(e.target.value)}
                rows={2}
                className="w-full resize-none"
              />
            </div>
          </div>
          <button
            onClick={createBuild}
            disabled={!newBuildName}
            className="btn btn-primary w-full mt-4"
          >
            Create Build
          </button>
        </div>
      )}

      {/* Builds List */}
      {builds.length === 0 ? (
        <div className="text-center py-16 bg-apex-gray/30 rounded-xl border border-dashed border-white/10">
          <Wrench className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No builds yet</p>
          <p className="text-gray-600 text-sm">Create your first build project to get started</p>
        </div>
      ) : (
        <div className="space-y-4">
          {builds.map(build => {
            const isExpanded = expandedBuild === build.id
            const progress = getProgress(build)
            const totalCost = getTotalCost(build)
            const currentStage = STAGES.find(s => s.id === build.stage)
            const partsNeeded = build.parts.filter(p => p.status === 'needed').length
            const partsOrdered = build.parts.filter(p => p.status === 'ordered').length
            const partsReceived = build.parts.filter(p => p.status === 'received').length
            
            return (
              <div key={build.id} className="card">
                {/* Build Header */}
                <div 
                  className="flex justify-between items-start cursor-pointer"
                  onClick={() => setExpandedBuild(isExpanded ? null : build.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{build.name}</h3>
                      <span className={`badge ${currentStage.color} text-white text-xs`}>
                        {currentStage.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                      {build.chassis && <span>🏎️ {build.chassis}</span>}
                      {build.body && <span>🎨 {build.body}</span>}
                      <span>💰 ${totalCost.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-apex-orange">{progress}%</div>
                    </div>
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-4 h-2 bg-apex-black rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${currentStage.color} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="mt-6 pt-6 border-t border-white/10 space-y-6">
                    {/* Stage Selector */}
                    <div>
                      <label className="text-xs text-gray-500 uppercase block mb-3">Build Stage</label>
                      <div className="flex flex-wrap gap-2">
                        {STAGES.map(stage => (
                          <button
                            key={stage.id}
                            onClick={() => updateBuildStage(build.id, stage.id)}
                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                              build.stage === stage.id
                                ? `${stage.color} text-white`
                                : 'bg-apex-gray-light text-gray-400 hover:bg-apex-gray'
                            }`}
                          >
                            {stage.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes */}
                    {build.notes && (
                      <div>
                        <label className="text-xs text-gray-500 uppercase block mb-2">Notes</label>
                        <p className="text-gray-300 bg-apex-black/50 rounded-lg p-3 text-sm">{build.notes}</p>
                      </div>
                    )}

                    {/* Parts List */}
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <label className="text-xs text-gray-500 uppercase">Parts List</label>
                        <div className="flex gap-2 text-xs">
                          <span className="badge badge-red">{partsNeeded} needed</span>
                          <span className="badge badge-orange">{partsOrdered} ordered</span>
                          <span className="badge badge-green">{partsReceived} received</span>
                        </div>
                      </div>
                      
                      {build.parts.length === 0 ? (
                        <p className="text-gray-600 text-sm">No parts added yet</p>
                      ) : (
                        <div className="space-y-2 mb-3">
                          {build.parts.map(part => (
                            <div key={part.id} className="flex items-center justify-between bg-apex-black/50 rounded-lg p-3">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    const nextStatus = part.status === 'needed' ? 'ordered' : part.status === 'ordered' ? 'received' : 'needed'
                                    updatePartStatus(build.id, part.id, nextStatus)
                                  }}
                                  className="hover:scale-110 transition-transform"
                                >
                                  {part.status === 'received' ? (
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                  ) : part.status === 'ordered' ? (
                                    <Clock className="w-5 h-5 text-orange-400" />
                                  ) : (
                                    <Circle className="w-5 h-5 text-gray-500" />
                                  )}
                                </button>
                                <span className={part.status === 'received' ? 'text-gray-400 line-through' : ''}>{part.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                {part.cost > 0 && <span className="text-apex-orange font-mono">${part.cost.toFixed(2)}</span>}
                                <button
                                  onClick={() => deletePart(build.id, part.id)}
                                  className="p-1 hover:bg-red-500/20 rounded text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Add Part Form */}
                      {showPartForm === build.id ? (
                        <div className="flex gap-2 mt-3">
                          <input
                            type="text"
                            placeholder="Part name"
                            value={newPartName}
                            onChange={(e) => setNewPartName(e.target.value)}
                            className="flex-1"
                          />
                          <input
                            type="number"
                            placeholder="Cost"
                            value={newPartCost}
                            onChange={(e) => setNewPartCost(e.target.value)}
                            className="w-24"
                          />
                          <select
                            value={newPartStatus}
                            onChange={(e) => setNewPartStatus(e.target.value)}
                            className="w-28"
                          >
                            <option value="needed">Needed</option>
                            <option value="ordered">Ordered</option>
                            <option value="received">Received</option>
                          </select>
                          <button onClick={() => addPart(build.id)} className="btn btn-primary px-4">
                            <Plus className="w-4 h-4" />
                          </button>
                          <button onClick={() => setShowPartForm(null)} className="btn btn-secondary px-4">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowPartForm(build.id)}
                          className="btn btn-secondary w-full mt-2 text-sm"
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add Part
                        </button>
                      )}
                    </div>

                    {/* Cost Summary */}
                    <div className="bg-apex-orange/10 border border-apex-orange/30 rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300">Total Build Cost</span>
                        <span className="text-2xl font-bold text-apex-orange font-mono">${totalCost.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-2">
                        <span>Parts: ${build.parts.reduce((sum, p) => sum + (p.cost || 0), 0).toFixed(2)}</span>
                        <span>Filament: ${(build.filamentCost || 0).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Delete Build */}
                    <button
                      onClick={() => deleteBuild(build.id)}
                      className="text-red-400 text-sm hover:underline"
                    >
                      Delete this build
                    </button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
