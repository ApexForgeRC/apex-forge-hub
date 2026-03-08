import React, { useState, useEffect } from 'react'
import { Package, Plus, Trash2, AlertTriangle, Search, Filter, DollarSign, Wrench, Cpu, CircleDot, Battery, Box, X, Edit3, Check } from 'lucide-react'

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

// Category structure with subcategories
const CATEGORIES = {
  equipment: {
    label: 'Equipment',
    icon: Wrench,
    color: 'bg-purple-500',
    subcategories: [
      '3D Printer',
      'Hand Tools',
      'Power Tools',
      'Soldering Equipment',
      'Measuring Tools',
      'Workstation',
      'Camera/Recording',
      'Other Equipment',
    ]
  },
  electronics: {
    label: 'Electronics',
    icon: Cpu,
    color: 'bg-blue-500',
    subcategories: [
      'Motor',
      'ESC',
      'Servo',
      'Receiver',
      'Transmitter',
      'Gyro',
      'LED/Lights',
      'Wiring/Connectors',
      'Other Electronics',
    ]
  },
  batteries: {
    label: 'Batteries & Power',
    icon: Battery,
    color: 'bg-green-500',
    subcategories: [
      'LiPo 2S',
      'LiPo 3S',
      'LiPo 4S',
      'NiMH',
      'Charger',
      'Power Supply',
      'Other Power',
    ]
  },
  wheels: {
    label: 'Wheels & Tires',
    icon: CircleDot,
    color: 'bg-orange-500',
    subcategories: [
      'Drift Tires',
      'Grip Tires',
      'Foam Tires',
      'Wheels/Rims',
      'Wheel Hexes',
      'Other Wheels',
    ]
  },
  hardware: {
    label: 'Hardware',
    icon: Box,
    color: 'bg-gray-500',
    subcategories: [
      'Screws - M2',
      'Screws - M3',
      'Screws - M4',
      'Nuts',
      'Washers',
      'Bearings',
      'Shafts/Pins',
      'Standoffs',
      'Body Clips',
      'Other Hardware',
    ]
  },
  chassis: {
    label: 'Chassis & Bodies',
    icon: Package,
    color: 'bg-red-500',
    subcategories: [
      'Complete Chassis',
      'Chassis Parts',
      'Body Shell',
      'Body Accessories',
      'Mounting Hardware',
      'Other Chassis',
    ]
  },
  assets: {
    label: 'Assets (Donor/Test)',
    icon: Wrench,
    color: 'bg-amber-500',
    subcategories: [
      'Donor Vehicle',
      'Test Platform',
      'Reference Build',
      'Parts Car',
      'Other Asset',
    ]
  },
}

const CONDITION_OPTIONS = ['New', 'Like New', 'Good', 'Fair', 'For Parts']
const SOURCE_OPTIONS = ['Bambu Lab', 'Amazon', 'AMain Hobbies', 'Tower Hobbies', 'Race Dawg RC', 'eBay', 'Local Hobby Shop', 'Donated/Salvaged', 'Other US Supplier']

export default function Inventory() {
  const [items, setItems] = useState(() => loadFromStorage('afrc_inventory', []))
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')
  const [activeTab, setActiveTab] = useState('inventory')
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'hardware',
    subcategory: '',
    quantity: 1,
    cost: '',
    condition: 'New',
    source: '',
    location: '',
    notes: '',
    lowStockThreshold: '',
    isEquipment: false,
    purchaseDate: '',
  })

  useEffect(() => { saveToStorage('afrc_inventory', items) }, [items])

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'hardware',
      subcategory: '',
      quantity: 1,
      cost: '',
      condition: 'New',
      source: '',
      location: '',
      notes: '',
      lowStockThreshold: '',
      isEquipment: false,
      purchaseDate: '',
    })
    setShowAddForm(false)
    setEditingItem(null)
  }

  const handleSubmit = () => {
    if (!formData.name || !formData.category) return

    const itemData = {
      ...formData,
      cost: parseFloat(formData.cost) || 0,
      quantity: parseInt(formData.quantity) || 1,
      lowStockThreshold: parseInt(formData.lowStockThreshold) || 0,
      isEquipment: formData.category === 'equipment' || formData.category === 'assets',
      updatedAt: new Date().toISOString(),
    }

    if (editingItem) {
      setItems(items.map(item => 
        item.id === editingItem.id ? { ...item, ...itemData } : item
      ))
    } else {
      setItems([{ ...itemData, id: Date.now(), createdAt: new Date().toISOString() }, ...items])
    }
    
    resetForm()
  }

  const deleteItem = (id) => {
    if (confirm('Delete this item?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const startEdit = (item) => {
    setFormData({
      name: item.name,
      category: item.category,
      subcategory: item.subcategory || '',
      quantity: item.quantity,
      cost: item.cost.toString(),
      condition: item.condition || 'New',
      source: item.source || '',
      location: item.location || '',
      notes: item.notes || '',
      lowStockThreshold: item.lowStockThreshold?.toString() || '',
      isEquipment: item.isEquipment || false,
      purchaseDate: item.purchaseDate || '',
    })
    setEditingItem(item)
    setShowAddForm(true)
  }

  const updateQuantity = (id, delta) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
    ))
  }

  // Filtering
  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.subcategory?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory
    return matchesSearch && matchesCategory
  })

  // Stats
  const totalValue = items.reduce((sum, item) => sum + (item.cost * item.quantity), 0)
  const equipmentValue = items.filter(i => i.isEquipment).reduce((sum, item) => sum + item.cost, 0)
  const lowStockItems = items.filter(item => item.lowStockThreshold && item.quantity <= item.lowStockThreshold)
  const inventoryItems = filteredItems.filter(i => !i.isEquipment)
  const equipmentItems = filteredItems.filter(i => i.isEquipment)

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold">Inventory & Equipment</h1>
          <p className="text-gray-500 text-sm">Track parts, hardware, tools, and assets</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`btn ${showAddForm ? 'btn-secondary' : 'btn-primary'} flex items-center gap-2`}
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? 'Cancel' : 'Add Item'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <span className="stat-label">Total Items</span>
          <span className="stat-value">{items.length}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Inventory Value</span>
          <span className="stat-value">${(totalValue - equipmentValue).toFixed(0)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Equipment Value</span>
          <span className="stat-value text-purple-400">${equipmentValue.toFixed(0)}</span>
        </div>
        <div className="stat-card">
          <span className="stat-label">Low Stock</span>
          <span className={`stat-value ${lowStockItems.length > 0 ? 'text-red-400' : 'text-green-400'}`}>
            {lowStockItems.length}
          </span>
        </div>
      </div>

      {/* Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center gap-2 text-red-400 font-semibold mb-2">
            <AlertTriangle className="w-5 h-5" />
            Low Stock Alert
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStockItems.map(item => (
              <span key={item.id} className="badge badge-red">
                {item.name} ({item.quantity} left)
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card border-apex-orange/30">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-apex-orange" />
            {editingItem ? 'Edit Item' : 'Add New Item'}
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Name */}
            <div className="col-span-2 lg:col-span-1">
              <label className="text-xs text-gray-500 uppercase block mb-2">Item Name *</label>
              <input
                type="text"
                placeholder="e.g., M3x10 Socket Head Screws"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Category *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value, subcategory: '' })}
                className="w-full"
              >
                {Object.entries(CATEGORIES).map(([key, cat]) => (
                  <option key={key} value={key}>{cat.label}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Type</label>
              <select
                value={formData.subcategory}
                onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                className="w-full"
              >
                <option value="">Select type...</option>
                {CATEGORIES[formData.category]?.subcategories.map(sub => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Quantity</label>
              <input
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Cost */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Cost ($)</label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Condition */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Condition</label>
              <select
                value={formData.condition}
                onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                className="w-full"
              >
                {CONDITION_OPTIONS.map(cond => (
                  <option key={cond} value={cond}>{cond}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Source</label>
              <select
                value={formData.source}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                className="w-full"
              >
                <option value="">Select source...</option>
                {SOURCE_OPTIONS.map(src => (
                  <option key={src} value={src}>{src}</option>
                ))}
              </select>
            </div>

            {/* Low Stock Threshold */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Low Stock Alert</label>
              <input
                type="number"
                min="0"
                placeholder="Alert when below..."
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Location */}
            <div>
              <label className="text-xs text-gray-500 uppercase block mb-2">Storage Location</label>
              <input
                type="text"
                placeholder="e.g., Bin A3, Shelf 2"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full"
              />
            </div>

            {/* Notes */}
            <div className="col-span-2 lg:col-span-3">
              <label className="text-xs text-gray-500 uppercase block mb-2">Notes</label>
              <textarea
                placeholder="Specs, part numbers, compatibility notes..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={2}
                className="w-full resize-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-4">
            <button onClick={handleSubmit} disabled={!formData.name} className="btn btn-primary flex-1">
              {editingItem ? 'Save Changes' : 'Add Item'}
            </button>
            <button onClick={resetForm} className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-48"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <option key={key} value={key}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'inventory'
              ? 'bg-apex-orange/20 text-apex-orange border-2 border-apex-orange'
              : 'bg-apex-gray text-gray-400 border-2 border-transparent'
          }`}
        >
          📦 Parts & Consumables ({inventoryItems.length})
        </button>
        <button
          onClick={() => setActiveTab('equipment')}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
            activeTab === 'equipment'
              ? 'bg-purple-500/20 text-purple-400 border-2 border-purple-500'
              : 'bg-apex-gray text-gray-400 border-2 border-transparent'
          }`}
        >
          🔧 Equipment & Assets ({equipmentItems.length})
        </button>
      </div>

      {/* Items List */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-apex-gray/30 rounded-xl border border-dashed border-white/10">
          <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-500">No items found</p>
          <p className="text-gray-600 text-sm">Add your first item to get started</p>
        </div>
      ) : (
        <div className="space-y-3">
          {(activeTab === 'inventory' ? inventoryItems : equipmentItems).map(item => {
            const category = CATEGORIES[item.category]
            const isLowStock = item.lowStockThreshold && item.quantity <= item.lowStockThreshold
            const CategoryIcon = category?.icon || Package
            
            return (
              <div 
                key={item.id} 
                className={`card ${isLowStock ? 'border-red-500/50' : ''}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`w-10 h-10 rounded-lg ${category?.color || 'bg-gray-500'} flex items-center justify-center flex-shrink-0`}>
                      <CategoryIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold">{item.name}</h3>
                        {item.subcategory && (
                          <span className="badge bg-white/10 text-gray-300 text-xs">{item.subcategory}</span>
                        )}
                        {isLowStock && (
                          <span className="badge badge-red text-xs">Low Stock</span>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-gray-400 mt-1">
                        {item.source && <span>📍 {item.source}</span>}
                        {item.condition && <span>✨ {item.condition}</span>}
                        {item.location && <span>📦 {item.location}</span>}
                      </div>
                      {item.notes && (
                        <p className="text-xs text-gray-500 mt-2">{item.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Quantity Controls (for non-equipment) */}
                    {!item.isEquipment && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 rounded-lg bg-apex-gray-light hover:bg-apex-gray flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-12 text-center font-mono font-bold text-lg">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 rounded-lg bg-apex-gray-light hover:bg-apex-gray flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                    )}

                    {/* Value */}
                    <div className="text-right">
                      <div className="text-lg font-bold text-apex-orange font-mono">
                        ${(item.cost * (item.isEquipment ? 1 : item.quantity)).toFixed(2)}
                      </div>
                      {!item.isEquipment && item.quantity > 1 && (
                        <div className="text-xs text-gray-500">${item.cost.toFixed(2)} ea</div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-1">
                      <button
                        onClick={() => startEdit(item)}
                        className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="p-2 hover:bg-red-500/20 rounded-lg text-red-400"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
