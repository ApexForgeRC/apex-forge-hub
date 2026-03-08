import React, { useState, useEffect } from 'react'
import { Calculator, Save, Trash2, Copy, Clock, DollarSign, Percent, User, FileText } from 'lucide-react'

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

export default function JobCalculator() {
  // Settings
  const [laborRate, setLaborRate] = useState(() => loadFromStorage('afrc_labor_rate', 25))
  const [defaultMarkup, setDefaultMarkup] = useState(() => loadFromStorage('afrc_default_markup', 200))
  const [electricityRate, setElectricityRate] = useState(() => loadFromStorage('afrc_electricity_rate', 0.12))
  const [printerWattage, setPrinterWattage] = useState(() => loadFromStorage('afrc_printer_wattage', 150))
  
  // Material prices from filament tracker
  const [materialPrices, setMaterialPrices] = useState(() => loadFromStorage('afrc_prices', {
    PLA: 14.99,
    PETG: 19.99,
    TPU: 24.99,
  }))

  // Quote form
  const [customerName, setCustomerName] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [material, setMaterial] = useState('PLA')
  const [materialWeight, setMaterialWeight] = useState('')
  const [printHours, setPrintHours] = useState('')
  const [printMinutes, setPrintMinutes] = useState('')
  const [laborHours, setLaborHours] = useState('')
  const [markup, setMarkup] = useState(defaultMarkup)
  const [notes, setNotes] = useState('')

  // Quotes history
  const [quotes, setQuotes] = useState(() => loadFromStorage('afrc_quotes', []))
  const [showSettings, setShowSettings] = useState(false)
  const [activeTab, setActiveTab] = useState('calculator')

  // Save settings when changed
  useEffect(() => { saveToStorage('afrc_labor_rate', laborRate) }, [laborRate])
  useEffect(() => { saveToStorage('afrc_default_markup', defaultMarkup) }, [defaultMarkup])
  useEffect(() => { saveToStorage('afrc_electricity_rate', electricityRate) }, [electricityRate])
  useEffect(() => { saveToStorage('afrc_printer_wattage', printerWattage) }, [printerWattage])
  useEffect(() => { saveToStorage('afrc_quotes', quotes) }, [quotes])

  // Calculations
  const totalPrintMinutes = (parseFloat(printHours) || 0) * 60 + (parseFloat(printMinutes) || 0)
  const totalPrintHours = totalPrintMinutes / 60

  const materialCost = ((parseFloat(materialWeight) || 0) / 1000) * (materialPrices[material] || 14.99)
  const electricityCost = totalPrintHours * (printerWattage / 1000) * electricityRate
  const laborCost = (parseFloat(laborHours) || 0) * laborRate
  
  const baseCost = materialCost + electricityCost + laborCost
  const markupAmount = baseCost * (markup / 100)
  const totalPrice = baseCost + markupAmount

  const saveQuote = () => {
    if (!jobDescription || totalPrice <= 0) return

    const newQuote = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      timestamp: new Date().toISOString(),
      customerName: customerName || 'Walk-in',
      jobDescription,
      material,
      materialWeight: parseFloat(materialWeight) || 0,
      printTime: totalPrintMinutes,
      laborHours: parseFloat(laborHours) || 0,
      markup,
      costs: {
        material: materialCost,
        electricity: electricityCost,
        labor: laborCost,
        base: baseCost,
        markupAmount,
        total: totalPrice,
      },
      notes,
      status: 'quoted',
    }

    setQuotes([newQuote, ...quotes])
    
    // Reset form
    setCustomerName('')
    setJobDescription('')
    setMaterialWeight('')
    setPrintHours('')
    setPrintMinutes('')
    setLaborHours('')
    setNotes('')
    setMarkup(defaultMarkup)
  }

  const deleteQuote = (id) => {
    setQuotes(quotes.filter(q => q.id !== id))
  }

  const updateQuoteStatus = (id, status) => {
    setQuotes(quotes.map(q => q.id === id ? { ...q, status } : q))
  }

  const copyQuoteText = (quote) => {
    const text = `
APEX FORGE RC - Quote
━━━━━━━━━━━━━━━━━━━━━
Customer: ${quote.customerName}
Date: ${quote.date}
Job: ${quote.jobDescription}

Material: ${quote.material} (${quote.materialWeight}g)
Print Time: ${Math.floor(quote.printTime / 60)}h ${quote.printTime % 60}m
Labor: ${quote.laborHours}hrs

━━━━━━━━━━━━━━━━━━━━━
TOTAL: $${quote.costs.total.toFixed(2)}
━━━━━━━━━━━━━━━━━━━━━
${quote.notes ? `\nNotes: ${quote.notes}` : ''}
    `.trim()
    
    navigator.clipboard.writeText(text)
  }

  const formatTime = (minutes) => {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h}h ${m}m`
  }

  const totalRevenue = quotes.filter(q => q.status === 'paid').reduce((sum, q) => sum + q.costs.total, 0)
  const pendingRevenue = quotes.filter(q => q.status === 'quoted' || q.status === 'accepted').reduce((sum, q) => sum + q.costs.total, 0)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold">Job Calculator</h1>
          <p className="text-gray-500 text-sm">Calculate print job costs and generate quotes</p>
        </div>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="btn btn-secondary text-sm"
        >
          ⚙️ Settings
        </button>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="card border-apex-orange/30 bg-apex-orange/5">
          <h3 className="text-apex-orange font-semibold mb-4">💰 Rate Settings</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Labor Rate ($/hr)</label>
              <input
                type="number"
                step="0.5"
                value={laborRate}
                onChange={(e) => setLaborRate(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Default Markup (%)</label>
              <input
                type="number"
                step="10"
                value={defaultMarkup}
                onChange={(e) => setDefaultMarkup(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Electricity ($/kWh)</label>
              <input
                type="number"
                step="0.01"
                value={electricityRate}
                onChange={(e) => setElectricityRate(parseFloat(e.target.value) || 0)}
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Printer Watts</label>
              <input
                type="number"
                step="10"
                value={printerWattage}
                onChange={(e) => setPrinterWattage(parseFloat(e.target.value) || 0)}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            💡 Georgia Power avg is ~$0.12/kWh. P1S uses ~150W printing, ~50W idle.
          </p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'calculator'
              ? 'bg-apex-orange/20 text-apex-orange border-2 border-apex-orange'
              : 'bg-apex-gray text-gray-400 border-2 border-transparent hover:bg-apex-gray-light'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Calculator
        </button>
        <button
          onClick={() => setActiveTab('quotes')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'quotes'
              ? 'bg-apex-orange/20 text-apex-orange border-2 border-apex-orange'
              : 'bg-apex-gray text-gray-400 border-2 border-transparent hover:bg-apex-gray-light'
          }`}
        >
          <FileText className="w-4 h-4" />
          Quotes ({quotes.length})
        </button>
      </div>

      {/* CALCULATOR TAB */}
      {activeTab === 'calculator' && (
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="card space-y-4">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <Calculator className="w-5 h-5 text-apex-orange" />
              Job Details
            </h2>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs text-gray-500 uppercase block mb-2">Customer Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Optional"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="pl-10 w-full"
                  />
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-500 uppercase block mb-2">Job Description *</label>
                <input
                  type="text"
                  placeholder="e.g., Custom motor mount for TT-02"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Material</label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full"
                >
                  <option value="PLA">PLA (${materialPrices.PLA}/kg)</option>
                  <option value="PETG">PETG (${materialPrices.PETG}/kg)</option>
                  <option value="TPU">TPU (${materialPrices.TPU}/kg)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Weight (grams)</label>
                <input
                  type="number"
                  placeholder="From slicer"
                  value={materialWeight}
                  onChange={(e) => setMaterialWeight(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Print Time (hrs)</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="H"
                    value={printHours}
                    onChange={(e) => setPrintHours(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    placeholder="M"
                    value={printMinutes}
                    onChange={(e) => setPrintMinutes(e.target.value)}
                    className="w-full"
                    max="59"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-gray-500 uppercase block mb-2">Labor (hrs)</label>
                <input
                  type="number"
                  step="0.25"
                  placeholder="Design, post-process"
                  value={laborHours}
                  onChange={(e) => setLaborHours(e.target.value)}
                />
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-500 uppercase block mb-2">
                  Markup: {markup}%
                </label>
                <input
                  type="range"
                  min="50"
                  max="500"
                  step="10"
                  value={markup}
                  onChange={(e) => setMarkup(parseInt(e.target.value))}
                  className="w-full h-2 bg-apex-gray-light rounded-lg appearance-none cursor-pointer accent-apex-orange"
                />
                <div className="flex justify-between text-xs text-gray-600 mt-1">
                  <span>50%</span>
                  <span>200%</span>
                  <span>500%</span>
                </div>
              </div>

              <div className="col-span-2">
                <label className="text-xs text-gray-500 uppercase block mb-2">Notes</label>
                <textarea
                  placeholder="Special instructions, customer requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="w-full resize-none"
                />
              </div>
            </div>
          </div>

          {/* Cost Breakdown */}
          <div className="space-y-4">
            <div className="card">
              <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-apex-orange" />
                Cost Breakdown
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Material ({material})</span>
                  <span className="font-mono">${materialCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Electricity ({totalPrintHours.toFixed(1)}hrs)</span>
                  <span className="font-mono">${electricityCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Labor ({laborHours || 0}hrs @ ${laborRate}/hr)</span>
                  <span className="font-mono">${laborCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/10">
                  <span className="text-gray-300 font-medium">Base Cost</span>
                  <span className="font-mono font-medium">${baseCost.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-gray-400">Markup ({markup}%)</span>
                  <span className="font-mono text-green-400">+${markupAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-apex-orange/30">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-semibold">Quote Total</span>
                  <span className="text-3xl font-bold text-apex-orange font-mono">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {/* Profit margin info */}
            <div className="card bg-green-500/5 border-green-500/20">
              <div className="flex items-center gap-3">
                <Percent className="w-8 h-8 text-green-400" />
                <div>
                  <div className="text-green-400 font-semibold">
                    Profit: ${markupAmount.toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {baseCost > 0 ? ((markupAmount / totalPrice) * 100).toFixed(0) : 0}% margin on this job
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <button
              onClick={saveQuote}
              disabled={!jobDescription || totalPrice <= 0}
              className="btn btn-primary w-full py-4 text-lg flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              Save Quote
            </button>
          </div>
        </div>
      )}

      {/* QUOTES TAB */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          {/* Stats */}
          {quotes.length > 0 && (
            <div className="grid grid-cols-3 gap-4">
              <div className="stat-card">
                <span className="stat-label">Total Quotes</span>
                <span className="stat-value">{quotes.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Paid Revenue</span>
                <span className="stat-value text-green-400">${totalRevenue.toFixed(0)}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Pending</span>
                <span className="stat-value text-yellow-400">${pendingRevenue.toFixed(0)}</span>
              </div>
            </div>
          )}

          {/* Quote List */}
          {quotes.length === 0 ? (
            <div className="text-center py-16 bg-apex-gray/30 rounded-xl border border-dashed border-white/10">
              <FileText className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500">No quotes saved yet</p>
              <p className="text-gray-600 text-sm">Create your first quote in the Calculator tab</p>
            </div>
          ) : (
            <div className="space-y-3">
              {quotes.map(quote => (
                <div key={quote.id} className="card">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{quote.jobDescription}</h3>
                      <p className="text-sm text-gray-500">{quote.customerName} • {quote.date}</p>
                    </div>
                    <span className="text-2xl font-bold text-apex-orange font-mono">
                      ${quote.costs.total.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3 text-xs">
                    <span className="badge badge-orange">{quote.material}</span>
                    <span className="badge bg-white/10 text-gray-300">
                      {quote.materialWeight}g
                    </span>
                    <span className="badge bg-white/10 text-gray-300">
                      <Clock className="w-3 h-3 mr-1 inline" />
                      {formatTime(quote.printTime)}
                    </span>
                    <span className="badge bg-white/10 text-gray-300">
                      {quote.markup}% markup
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex gap-2">
                      <select
                        value={quote.status}
                        onChange={(e) => updateQuoteStatus(quote.id, e.target.value)}
                        className="text-xs py-1 px-2 bg-apex-black border border-white/10 rounded"
                      >
                        <option value="quoted">📝 Quoted</option>
                        <option value="accepted">✅ Accepted</option>
                        <option value="in_progress">🔧 In Progress</option>
                        <option value="completed">📦 Completed</option>
                        <option value="paid">💰 Paid</option>
                        <option value="declined">❌ Declined</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => copyQuoteText(quote)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
                        title="Copy quote text"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteQuote(quote.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                        title="Delete quote"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
