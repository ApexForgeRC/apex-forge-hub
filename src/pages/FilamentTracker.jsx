import React, { useState, useEffect } from 'react'
import { Plus, Trash2, AlertTriangle } from 'lucide-react'

const MATERIALS = {
  PLA: { name: 'PLA', defaultPrice: 14.99, density: 1.24 },
  PETG: { name: 'PETG', defaultPrice: 19.99, density: 1.27 },
  TPU: { name: 'TPU', defaultPrice: 24.99, density: 1.21 },
}

const ROLL_WEIGHT_G = 1000

// Local storage helpers
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

export default function FilamentTracker() {
  const [spools, setSpools] = useState(() => loadFromStorage('afrc_spools', []))
  const [entries, setEntries] = useState(() => loadFromStorage('afrc_prints', []))
  const [customPrices, setCustomPrices] = useState(() => loadFromStorage('afrc_prices', {
    PLA: 14.99,
    PETG: 19.99,
    TPU: 24.99,
  }))
  
  const [activeTab, setActiveTab] = useState('entry')
  const [showSpoolForm, setShowSpoolForm] = useState(false)
  const [showPriceEditor, setShowPriceEditor] = useState(false)
  
  // Entry form
  const [selectedSpool, setSelectedSpool] = useState('')
  const [printName, setPrintName] = useState('')
  const [weightUsed, setWeightUsed] = useState('')
  const [lengthUsed, setLengthUsed] = useState('')
  
  // Spool form
  const [newSpoolName, setNewSpoolName] = useState('')
  const [newSpoolMaterial, setNewSpoolMaterial] = useState('PLA')
  const [newSpoolWeight, setNewSpoolWeight] = useState('1000')
  const [newSpoolColor, setNewSpoolColor] = useState('#ffffff')

  // Save to localStorage whenever data changes
  useEffect(() => { saveToStorage('afrc_spools', spools) }, [spools])
  useEffect(() => { saveToStorage('afrc_prints', entries) }, [entries])
  useEffect(() => { saveToStorage('afrc_prices', customPrices) }, [customPrices])

  const calculateCost = (weightG, material) => {
    const pricePerRoll = customPrices[material]
    const costPerGram = pricePerRoll / ROLL_WEIGHT_G
    return (weightG * costPerGram).toFixed(2)
  }

  const estimateLengthFromWeight = (weightG, material) => {
    const density = MATERIALS[material]?.density || 1.24
    const radiusMM = 0.875
    const volumeMM3 = (weightG / density) * 1000
    const lengthMM = volumeMM3 / (Math.PI * radiusMM * radiusMM)
    return Math.round(lengthMM)
  }

  const estimateWeightFromLength = (lengthMM, material) => {
    const density = MATERIALS[material]?.density || 1.24
    const radiusMM = 0.875
    const volumeMM3 = Math.PI * radiusMM * radiusMM * lengthMM
    const weightG = (volumeMM3 / 1000) * density
    return weightG
  }

  const formatLength = (mm) => {
    if (mm >= 1000) return `${(mm / 1000).toFixed(1)}m`
    return `${Math.round(mm)}mm`
  }

  const addSpool = () => {
    if (!newSpoolName) return
    
    const newSpool = {
      id: Date.now(),
      name: newSpoolName,
      material: newSpoolMaterial,
      color: newSpoolColor,
      initialWeightG: parseFloat(newSpoolWeight) || 1000,
      remainingWeightG: parseFloat(newSpoolWeight) || 1000,
      remainingLengthMM: estimateLengthFromWeight(parseFloat(newSpoolWeight) || 1000, newSpoolMaterial),
      dateAdded: new Date().toLocaleDateString(),
    }
    
    setSpools([newSpool, ...spools])
    setNewSpoolName('')
    setNewSpoolWeight('1000')
    setShowSpoolForm(false)
    if (!selectedSpool) setSelectedSpool(newSpool.id.toString())
  }

  const addEntry = () => {
    if (!printName || !selectedSpool || (!weightUsed && !lengthUsed)) return
    
    const spool = spools.find(s => s.id.toString() === selectedSpool)
    if (!spool) return

    let weight = parseFloat(weightUsed) || 0
    let length = parseFloat(lengthUsed) || 0

    if (!weightUsed && lengthUsed) {
      weight = estimateWeightFromLength(length, spool.material)
    }
    if (weightUsed && !lengthUsed) {
      length = estimateLengthFromWeight(weight, spool.material)
    }

    const cost = calculateCost(weight, spool.material)
    
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      name: printName,
      spoolId: spool.id,
      spoolName: spool.name,
      material: spool.material,
      color: spool.color,
      weightG: Math.round(weight * 100) / 100,
      lengthMM: Math.round(length),
      cost: parseFloat(cost),
    }
    
    setSpools(spools.map(s => {
      if (s.id === spool.id) {
        return {
          ...s,
          remainingWeightG: Math.max(0, s.remainingWeightG - weight),
          remainingLengthMM: Math.max(0, s.remainingLengthMM - length),
        }
      }
      return s
    }))
    
    setEntries([newEntry, ...entries])
    setPrintName('')
    setWeightUsed('')
    setLengthUsed('')
  }

  const deleteEntry = (id) => {
    const entry = entries.find(e => e.id === id)
    if (entry) {
      setSpools(spools.map(s => {
        if (s.id === entry.spoolId) {
          return {
            ...s,
            remainingWeightG: s.remainingWeightG + entry.weightG,
            remainingLengthMM: s.remainingLengthMM + entry.lengthMM,
          }
        }
        return s
      }))
    }
    setEntries(entries.filter(e => e.id !== id))
  }

  const deleteSpool = (id) => {
    setSpools(spools.filter(s => s.id !== id))
    setEntries(entries.filter(e => e.spoolId !== id))
    if (selectedSpool === id.toString()) setSelectedSpool('')
  }

  const currentSpool = spools.find(s => s.id.toString() === selectedSpool)
  const totalCost = entries.reduce((sum, e) => sum + e.cost, 0)
  const totalWeight = entries.reduce((sum, e) => sum + e.weightG, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Price Editor Toggle */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowPriceEditor(!showPriceEditor)}
          className="btn btn-secondary text-sm"
        >
          ⚙️ Material Prices
        </button>
      </div>

      {/* Price Editor */}
      {showPriceEditor && (
        <div className="card border-apex-orange/30 bg-apex-orange/5">
          <h3 className="text-apex-orange font-semibold mb-4">💰 Material Prices (per 1kg roll)</h3>
          <div className="grid grid-cols-3 gap-4">
            {Object.keys(MATERIALS).map(mat => (
              <div key={mat}>
                <label className="text-xs text-gray-500 uppercase">{mat}</label>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-apex-orange">$</span>
                  <input
                    type="number"
                    step="0.01"
                    value={customPrices[mat]}
                    onChange={(e) => setCustomPrices({
                      ...customPrices,
                      [mat]: parseFloat(e.target.value) || 0
                    })}
                    className="flex-1"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        {[
          { id: 'entry', label: '➕ New Print' },
          { id: 'spools', label: `🧵 Spools (${spools.length})` },
          { id: 'history', label: `📋 History (${entries.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-apex-orange/20 text-apex-orange border-2 border-apex-orange'
                : 'bg-apex-gray text-gray-400 border-2 border-transparent hover:bg-apex-gray-light'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ENTRY TAB */}
      {activeTab === 'entry' && (
        <div className="card">
          <h2 className="text-apex-orange font-semibold text-lg mb-6">Log Print Usage</h2>

          {spools.length === 0 ? (
            <div className="text-center py-12 bg-apex-black/50 rounded-xl border border-dashed border-white/10">
              <p className="text-gray-400 mb-4">Add a spool first to start tracking prints</p>
              <button onClick={() => setActiveTab('spools')} className="btn btn-primary">
                Go to Spools →
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Select Spool</label>
                <select
                  value={selectedSpool}
                  onChange={(e) => setSelectedSpool(e.target.value)}
                  className="w-full"
                >
                  <option value="">-- Choose a spool --</option>
                  {spools.map(spool => (
                    <option key={spool.id} value={spool.id}>
                      {spool.name} ({spool.remainingWeightG.toFixed(0)}g left)
                    </option>
                  ))}
                </select>
              </div>

              {currentSpool && (
                <div className="flex items-center gap-3 bg-apex-black/50 rounded-lg p-3">
                  <div 
                    className="w-6 h-6 rounded-full border-2 border-white/20"
                    style={{ backgroundColor: currentSpool.color }}
                  />
                  <span className="text-gray-400 text-sm">Remaining:</span>
                  <span className="text-apex-orange font-mono font-semibold">
                    {currentSpool.remainingWeightG.toFixed(0)}g / {formatLength(currentSpool.remainingLengthMM)}
                  </span>
                </div>
              )}

              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Print Name / Part</label>
                <input
                  type="text"
                  placeholder="e.g., Explorer MK1 Motor Mount"
                  value={printName}
                  onChange={(e) => setPrintName(e.target.value)}
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-2">Weight Used (grams)</label>
                  <input
                    type="number"
                    placeholder="From Bambu Studio"
                    value={weightUsed}
                    onChange={(e) => setWeightUsed(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-2">Length Used (mm)</label>
                  <input
                    type="number"
                    placeholder="From Bambu Studio"
                    value={lengthUsed}
                    onChange={(e) => setLengthUsed(e.target.value)}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-500">
                💡 Enter weight OR length — the other will be calculated
              </p>

              {(weightUsed || lengthUsed) && currentSpool && (
                <div className="bg-apex-orange/10 border border-apex-orange/30 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Estimated Cost:</span>
                    <span className="text-3xl font-bold text-apex-orange font-mono">
                      ${calculateCost(
                        weightUsed 
                          ? parseFloat(weightUsed) 
                          : estimateWeightFromLength(parseFloat(lengthUsed) || 0, currentSpool.material),
                        currentSpool.material
                      )}
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={addEntry}
                disabled={!printName || !selectedSpool || (!weightUsed && !lengthUsed)}
                className="btn btn-primary w-full py-4 text-lg uppercase tracking-wide"
              >
                Log Print
              </button>
            </div>
          )}
        </div>
      )}

      {/* SPOOLS TAB */}
      {activeTab === 'spools' && (
        <div className="space-y-4">
          <button
            onClick={() => setShowSpoolForm(!showSpoolForm)}
            className={`w-full py-4 rounded-xl font-bold ${showSpoolForm ? 'btn-secondary' : 'btn btn-primary'}`}
          >
            {showSpoolForm ? '✕ Cancel' : '+ Add New Spool'}
          </button>

          {showSpoolForm && (
            <div className="card">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 uppercase block mb-2">Spool Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Bambu PLA Basic - White"
                    value={newSpoolName}
                    onChange={(e) => setNewSpoolName(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-2">Material</label>
                  <select
                    value={newSpoolMaterial}
                    onChange={(e) => setNewSpoolMaterial(e.target.value)}
                    className="w-full"
                  >
                    {Object.keys(MATERIALS).map(mat => (
                      <option key={mat} value={mat}>{mat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 uppercase block mb-2">Weight (g)</label>
                  <input
                    type="number"
                    value={newSpoolWeight}
                    onChange={(e) => setNewSpoolWeight(e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="text-xs text-gray-500 uppercase block mb-2">Color</label>
                  <div className="flex gap-3">
                    <input
                      type="color"
                      value={newSpoolColor}
                      onChange={(e) => setNewSpoolColor(e.target.value)}
                      className="w-14 h-12 rounded-lg cursor-pointer border-0 p-0"
                    />
                    <input
                      type="text"
                      value={newSpoolColor}
                      onChange={(e) => setNewSpoolColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={addSpool}
                disabled={!newSpoolName}
                className="btn btn-primary w-full mt-4"
              >
                Add Spool
              </button>
            </div>
          )}

          {spools.length === 0 ? (
            <div className="text-center py-12 bg-apex-gray/30 rounded-xl border border-dashed border-white/10">
              <p className="text-gray-500">No spools added yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {spools.map(spool => {
                const percentLeft = (spool.remainingWeightG / spool.initialWeightG) * 100
                const isLow = percentLeft < 20
                
                return (
                  <div 
                    key={spool.id} 
                    className={`card ${isLow ? 'border-red-500/50' : ''}`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full border-2 border-white/20"
                          style={{ backgroundColor: spool.color, boxShadow: `0 0 12px ${spool.color}40` }}
                        />
                        <div>
                          <h3 className="font-semibold">{spool.name}</h3>
                          <span className="badge badge-orange">{spool.material}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => deleteSpool(spool.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="h-3 bg-apex-black rounded-full overflow-hidden mb-3">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          isLow ? 'bg-gradient-to-r from-red-500 to-red-400' : 'bg-gradient-to-r from-apex-orange to-apex-orange-light'
                        }`}
                        style={{ width: `${percentLeft}%` }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-apex-black/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">WEIGHT LEFT</div>
                        <div className="text-xl font-bold text-apex-orange font-mono">
                          {spool.remainingWeightG.toFixed(0)}g
                        </div>
                      </div>
                      <div className="bg-apex-black/50 rounded-lg p-3 text-center">
                        <div className="text-xs text-gray-500 mb-1">LENGTH LEFT</div>
                        <div className="text-xl font-bold text-apex-orange font-mono">
                          {formatLength(spool.remainingLengthMM)}
                        </div>
                      </div>
                    </div>

                    {isLow && (
                      <div className="mt-3 flex items-center gap-2 text-red-400 bg-red-500/10 rounded-lg p-2 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        Low filament — time to reorder!
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* HISTORY TAB */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          {entries.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card">
                <span className="stat-label">Total Prints</span>
                <span className="stat-value">{entries.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Material Cost</span>
                <span className="stat-value">${totalCost.toFixed(2)}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Total Used</span>
                <span className="stat-value">{totalWeight.toFixed(0)}g</span>
              </div>
            </div>
          )}

          {entries.length === 0 ? (
            <div className="text-center py-12 bg-apex-gray/30 rounded-xl border border-dashed border-white/10">
              <p className="text-gray-500">No prints logged yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map(entry => (
                <div key={entry.id} className="card flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full border border-white/20"
                      style={{ backgroundColor: entry.color }}
                    />
                    <div>
                      <h4 className="font-medium">{entry.name}</h4>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span className="badge badge-orange">{entry.material}</span>
                        <span>📅 {entry.date}</span>
                        <span>⚖️ {entry.weightG}g</span>
                        <span>📏 {formatLength(entry.lengthMM)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-apex-orange font-mono">
                      ${entry.cost.toFixed(2)}
                    </span>
                    <button
                      onClick={() => deleteEntry(entry.id)}
                      className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {entries.length > 0 && (
            <div className="card bg-apex-orange/5 border-apex-orange/20">
              <p className="text-sm text-gray-400">
                💰 <strong className="text-apex-orange">Pricing guide:</strong> Material cost is ${totalCost.toFixed(2)} for {entries.length} prints. 
                At 3x markup, bill ~${(totalCost * 3).toFixed(2)} to cover labor + wear.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
