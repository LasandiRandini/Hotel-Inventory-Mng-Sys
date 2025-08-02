import React, { useState } from 'react';
import { 
  AlertTriangle, 
  TrendingUp, 
  Package, 
  DollarSign, 
  Users, 
  Plus, 
  Search, 
  Filter,
  Edit3,
  Trash2,
  Eye,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  Calendar,
  Building2,
  ShoppingCart,
  X,
  Check,
  Clock,
  Download,
  Upload
} from 'lucide-react';

const HotelInventorySystem = () => {
  const [activeStockInTab, setActiveStockInTab] = useState('Food');
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [showFilters, setShowFilters] = useState(false);
  
  const [stockInForm, setStockInForm] = useState({
    item: '',
    category: '',
    quantity: '',
    unitPrice: '',
    stockedDate: new Date().toISOString().split('T')[0],
    expiryDate: '',
    supplier: '',
    remarks: ''
  });

  const [newItemForm, setNewItemForm] = useState({
    name: '',
    category: '',
    unit: '',
    minStock: '',
    type: 'Consumable',
    status: 'Active'
  });

  const [stockInEntries, setStockInEntries] = useState([
    { id: 1, date: '2025-08-02', item: 'Milk', category: 'Food', qty: 50, unit: 'Litre', unitPrice: 60, totalValue: 3000, batchId: 'BATCH-240802001', expiry: '2025-08-05', supplier: 'ABC Dairy', status: 'Active' },
    { id: 2, date: '2025-08-02', item: 'Toilet Paper', category: 'Cleaning', qty: 100, unit: 'Roll', unitPrice: 25, totalValue: 2500, batchId: 'BATCH-240802002', expiry: '', supplier: 'XYZ Supplies', status: 'Active' },
    { id: 3, date: '2025-08-01', item: 'Bath Towels', category: 'Linen', qty: 20, unit: 'Piece', unitPrice: 350, totalValue: 7000, batchId: 'BATCH-240801003', expiry: '', supplier: 'Linen Co.', status: 'Active' },
    { id: 4, date: '2025-08-01', item: 'Rice', category: 'Food', qty: 100, unit: 'Kg', unitPrice: 80, totalValue: 8000, batchId: 'BATCH-240801004', expiry: '2025-12-01', supplier: 'Rice Mills', status: 'Active' },
    { id: 5, date: '2025-07-31', item: 'Detergent', category: 'Cleaning', qty: 25, unit: 'Packet', unitPrice: 120, totalValue: 3000, batchId: 'BATCH-240731005', expiry: '', supplier: 'Cleaning Co.', status: 'Active' }
  ]);

  const categories = ['Food', 'Cleaning', 'Linen', 'Maintenance', 'Amenities'];
  const units = ['Piece', 'Kg', 'Litre', 'Bottle', 'Pack', 'Box', 'Roll', 'Set', 'Meter', 'Gram'];
  
  const allItems = {
    Food: [
      { id: 1, name: 'Milk', unit: 'Litre', minStock: 20, type: 'Consumable', status: 'Active', currentStock: 100 },
      { id: 6, name: 'Rice', unit: 'Kg', minStock: 50, type: 'Consumable', status: 'Active', currentStock: 200 },
      { id: 9, name: 'Cooking Oil', unit: 'Litre', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 25 },  
      { id: 10, name: 'Sugar', unit: 'Kg', minStock: 15, type: 'Consumable', status: 'Active', currentStock: 30 },
      { id: 11, name: 'Tea Bags', unit: 'Box', minStock: 5, type: 'Consumable', status: 'Active', currentStock: 12 }
    ],
    Cleaning: [
      { id: 2, name: 'Toilet Paper', unit: 'Roll', minStock: 15, type: 'Consumable', status: 'Active', currentStock: 5 },
      { id: 4, name: 'All-Purpose Cleaner', unit: 'Bottle', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 25 },
      { id: 7, name: 'Detergent', unit: 'Packet', minStock: 8, type: 'Consumable', status: 'Active', currentStock: 15 },
      { id: 12, name: 'Floor Cleaner', unit: 'Bottle', minStock: 6, type: 'Consumable', status: 'Active', currentStock: 18 },
      { id: 13, name: 'Glass Cleaner', unit: 'Bottle', minStock: 4, type: 'Consumable', status: 'Active', currentStock: 8 }
    ],
    Linen: [
      { id: 3, name: 'Bath Towels', unit: 'Piece', minStock: 30, type: 'Non-Consumable', status: 'Active', currentStock: 45 },
      { id: 5, name: 'Bed Sheets', unit: 'Set', minStock: 20, type: 'Non-Consumable', status: 'Active', currentStock: 8 },
      { id: 8, name: 'Pillow Cases', unit: 'Piece', minStock: 25, type: 'Non-Consumable', status: 'Active', currentStock: 40 },
      { id: 14, name: 'Blankets', unit: 'Piece', minStock: 15, type: 'Non-Consumable', status: 'Active', currentStock: 22 }
    ],
    Maintenance: [
      { id: 15, name: 'Light Bulbs', unit: 'Piece', minStock: 20, type: 'Consumable', status: 'Active', currentStock: 35 },
      { id: 16, name: 'Batteries', unit: 'Pack', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 15 }
    ],
    Amenities: [
      { id: 17, name: 'Shampoo', unit: 'Bottle', minStock: 12, type: 'Consumable', status: 'Active', currentStock: 20 },
      { id: 18, name: 'Soap', unit: 'Bar', minStock: 25, type: 'Consumable', status: 'Active', currentStock: 45 }
    ]
  };

  const handleStockInSubmit = (e) => {
    e.preventDefault();
    const selectedItem = allItems[stockInForm.category]?.find(item => item.id === parseInt(stockInForm.item));
    if (!selectedItem) return;

    const newEntry = {
      id: stockInEntries.length + 1,
      date: stockInForm.stockedDate,
      item: selectedItem.name,
      category: stockInForm.category,
      qty: parseFloat(stockInForm.quantity),
      unit: selectedItem.unit,
      unitPrice: parseFloat(stockInForm.unitPrice),
      totalValue: parseFloat(stockInForm.quantity) * parseFloat(stockInForm.unitPrice),
      batchId: `BATCH-${stockInForm.stockedDate.replace(/-/g, '')}${String(stockInEntries.length + 1).padStart(3, '0')}`,
      expiry: stockInForm.expiryDate,
      supplier: stockInForm.supplier,
      remarks: stockInForm.remarks,
      status: 'Active'
    };

    setStockInEntries(prev => [newEntry, ...prev]);
    
    // Reset form
    setStockInForm({
      item: '',
      category: '',
      quantity: '',
      unitPrice: '',
      stockedDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      supplier: '',
      remarks: ''
    });
    
    alert(`Stock added successfully! Batch ID: ${newEntry.batchId}`);
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    
    const newItem = {
      id: Math.max(...Object.values(allItems).flat().map(item => item.id)) + 1,
      name: newItemForm.name,
      unit: newItemForm.unit,
      minStock: parseInt(newItemForm.minStock),
      type: newItemForm.type,
      status: newItemForm.status,
      currentStock: 0
    };

    // Add item to the appropriate category
    if (allItems[newItemForm.category]) {
      allItems[newItemForm.category].push(newItem);
    }

    alert('Item added successfully!');
    setShowAddItemModal(false);
    setNewItemForm({
      name: '',
      category: '',
      unit: '',
      minStock: '',
      type: 'Consumable',
      status: 'Active'
    });
  };

  const handleFormChange = (field, value) => {
    setStockInForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNewItemChange = (field, value) => {
    setNewItemForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getFilteredItems = (category) => {
    const items = allItems[category] || [];
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterStatus !== 'all') {
      if (filterStatus === 'low-stock') {
        filtered = filtered.filter(item => item.currentStock <= item.minStock);
      } else {
        filtered = filtered.filter(item => item.status.toLowerCase() === filterStatus);
      }
    }

    return filtered;
  };

  const getFilteredStockEntries = () => {
    let filtered = stockInEntries;

    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.supplier.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(entry => entry.date === dateFilter);
    }

    if (filterStatus !== 'all') {
      filtered = filtered.filter(entry => entry.status.toLowerCase() === filterStatus);
    }

    return filtered;
  };

  const selectedItem = allItems[stockInForm.category]?.find(item => item.id === parseInt(stockInForm.item));

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Stock In Management</h1>
            <p className="text-gray-600 mt-1">Add new inventory stock with batch tracking and comprehensive management</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Upload className="h-4 w-4" />
              <span>Bulk Import</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Today's Stock In</p>
                <p className="text-2xl font-bold text-blue-700">₹{stockInEntries.filter(e => e.date === new Date().toISOString().split('T')[0]).reduce((sum, e) => sum + e.totalValue, 0).toLocaleString()}</p>
              </div>
              <Package className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Entries Today</p>
                <p className="text-2xl font-bold text-green-700">{stockInEntries.filter(e => e.date === new Date().toISOString().split('T')[0]).length}</p>
              </div>
              <ArrowUpRight className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Active Batches</p>
                <p className="text-2xl font-bold text-purple-700">{stockInEntries.filter(e => e.status === 'Active').length}</p>
              </div>
              <BarChart3 className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Total Items</p>
                <p className="text-2xl font-bold text-orange-700">{Object.values(allItems).flat().length}</p>
              </div>
              <Package className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Advanced Filters</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Filter</label>
                <input
                  type="date"
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={activeStockInTab}
                  onChange={(e) => setActiveStockInTab(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="low-stock">Low Stock</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDateFilter(new Date().toISOString().split('T')[0]);
                    setFilterStatus('all');
                    setActiveStockInTab('Food');
                  }}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Side - Item Selection */}
          <div className="xl:col-span-2 space-y-6">
            {/* Category Tabs */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Select Item by Category</h2>
                <p className="text-sm text-gray-600">Choose a category to view available items</p>
              </div>
              
              {/* Category Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveStockInTab(category)}
                      className={`flex-shrink-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeStockInTab === category
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {category}
                      <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                        {allItems[category]?.length || 0}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Search and Filter for Items */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search items in this category..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="low-stock">Low Stock</option>
                  </select>
                  <button
                    onClick={() => setShowAddItemModal(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>

              {/* Items List */}
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {getFilteredItems(activeStockInTab).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        handleFormChange('category', activeStockInTab);
                        handleFormChange('item', item.id.toString());
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        stockInForm.item === item.id.toString() 
                          ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">Unit: {item.unit}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                              item.type === 'Consumable' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                            }`}>
                              {item.type}
                            </span>
                            {item.currentStock <= item.minStock && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Low Stock
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">Stock: {item.currentStock}</p>
                          <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {getFilteredItems(activeStockInTab).length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No items found in this category</p>
                    <button
                      onClick={() => setShowAddItemModal(true)}
                      className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Add the first item
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Side - Stock In Form */}
          <div className="space-y-6">
            {/* Stock In Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Stock Entry Form</h2>
                <p className="text-sm text-gray-600 mt-1">Create new batch entry</p>
              </div>

              <form onSubmit={handleStockInSubmit} className="space-y-4">
                {/* Selected Item Display */}
                {selectedItem && (
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">{selectedItem.name}</h3>
                        <p className="text-sm text-gray-600">{stockInForm.category} • {selectedItem.unit}</p>
                        <p className="text-xs text-gray-500 mt-1">Current Stock: {selectedItem.currentStock} {selectedItem.unit}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedItem.type === 'Consumable' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedItem.type}
                      </span>
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={stockInForm.quantity}
                    onChange={(e) => handleFormChange('quantity', e.target.value)}
                    placeholder={selectedItem ? `Enter quantity in ${selectedItem.unit}` : "Select item first"}
                    min="0.01"
                    step="0.01"
                    disabled={!selectedItem}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>

                {/* Unit Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Unit Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={stockInForm.unitPrice}
                    onChange={(e) => handleFormChange('unitPrice', e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    disabled={!selectedItem}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                    required
                  />
                </div>

                {/* Stocked Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stocked Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={stockInForm.stockedDate}
                    onChange={(e) => handleFormChange('stockedDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                    <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                  </label>
                  <input
                    type="date"
                    value={stockInForm.expiryDate}
                    onChange={(e) => handleFormChange('expiryDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Supplier */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Supplier
                    <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={stockInForm.supplier}
                    onChange={(e) => handleFormChange('supplier', e.target.value)}
                    placeholder="Enter supplier name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Remarks */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Remarks
                    <span className="text-gray-400 text-xs ml-1">(Optional)</span>
                  </label>
                  <textarea
                    value={stockInForm.remarks}
                    onChange={(e) => handleFormChange('remarks', e.target.value)}
                    placeholder="Any additional notes"
                    rows="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={!selectedItem}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-300"
                  >
                    Add Stock Entry
                  </button>
                </div>
              </form>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Stock-In Batches</h3>
              <div className="overflow-x-auto max-h-[300px]">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs uppercase bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2">Date</th>
                      <th scope="col" className="px-4 py-2">Item</th>
                      <th scope="col" className="px-4 py-2">Qty</th>
                      <th scope="col" className="px-4 py-2">Unit Price</th>
                      <th scope="col" className="px-4 py-2">Total</th>
                      <th scope="col" className="px-4 py-2">Batch</th>
                      <th scope="col" className="px-4 py-2">Supplier</th>
                      <th scope="col" className="px-4 py-2">Expiry</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredStockEntries().slice(0, 5).map((entry) => (
                      <tr key={entry.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-4 py-2">{entry.date}</td>
                        <td className="px-4 py-2">{entry.item}</td>
                        <td className="px-4 py-2">{entry.qty} {entry.unit}</td>
                        <td className="px-4 py-2">₹{entry.unitPrice}</td>
                        <td className="px-4 py-2">₹{entry.totalValue}</td>
                        <td className="px-4 py-2 font-mono text-xs text-blue-600">{entry.batchId}</td>
                        <td className="px-4 py-2">{entry.supplier || '-'}</td>
                        <td className="px-4 py-2">{entry.expiry || '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInventorySystem;
