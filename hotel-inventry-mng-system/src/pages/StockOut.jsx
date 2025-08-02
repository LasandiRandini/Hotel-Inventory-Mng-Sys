import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  TrendingDown, 
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
  Upload,
  ChevronDown,
  Minus
} from 'lucide-react';

const HotelStockOutSystem = () => {
  const [activeStockOutTab, setActiveStockOutTab] = useState('Food');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateFilter, setDateFilter] = useState(new Date().toISOString().split('T')[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [autoFillFIFO, setAutoFillFIFO] = useState(true);
  
  const [stockOutForm, setStockOutForm] = useState({
    item: '',
    category: '',
    totalQuantity: '',
    department: 'Kitchen',
    outDate: new Date().toISOString().split('T')[0],
    reason: '',
    remarks: ''
  });

  const [selectedBatches, setSelectedBatches] = useState({});

  const [stockOutEntries, setStockOutEntries] = useState([
    { id: 1, date: '2025-08-02', item: 'Milk', category: 'Food', qty: 10, unit: 'Litre', department: 'Kitchen', reason: 'Cooking', batchId: 'BATCH-240802001', expense: 600, status: 'Completed' },
    { id: 2, date: '2025-08-02', item: 'Toilet Paper', category: 'Cleaning', qty: 20, unit: 'Roll', department: 'Housekeeping', reason: 'Room Service', batchId: 'BATCH-240802002', expense: 500, status: 'Completed' },
    { id: 3, date: '2025-08-01', item: 'Bath Towels', category: 'Linen', qty: 5, unit: 'Piece', department: 'Housekeeping', reason: 'Guest Room', batchId: 'BATCH-240801003', expense: 1750, status: 'Completed' }
  ]);

  const categories = ['Food', 'Cleaning', 'Linen', 'Maintenance', 'Amenities'];
  const departments = ['Kitchen', 'Housekeeping', 'Front Desk', 'Maintenance', 'Restaurant', 'Bar', 'Laundry'];
  const reasons = ['Cooking', 'Room Service', 'Guest Room', 'Cleaning', 'Maintenance', 'Event', 'Wastage', 'Damage', 'Other'];
  
  // Mock available batches for each item
  const mockBatches = {
    1: [ // Milk batches
      { id: 'B001', stockedDate: '2025-07-20', expiryDate: '2025-08-30', availableQty: 15, costPerUnit: 60, supplier: 'ABC Dairy' },
      { id: 'B002', stockedDate: '2025-07-27', expiryDate: '2025-09-10', availableQty: 35, costPerUnit: 60, supplier: 'ABC Dairy' },
      { id: 'B003', stockedDate: '2025-07-25', expiryDate: '2025-09-05', availableQty: 25, costPerUnit: 65, supplier: 'XYZ Dairy' }
    ],
    2: [ // Toilet Paper batches
      { id: 'B004', stockedDate: '2025-08-01', expiryDate: '', availableQty: 80, costPerUnit: 25, supplier: 'Clean Co' },
      { id: 'B005', stockedDate: '2025-07-28', expiryDate: '', availableQty: 15, costPerUnit: 25, supplier: 'Clean Co' }
    ],
    6: [ // Rice batches
      { id: 'B006', stockedDate: '2025-07-15', expiryDate: '2025-12-01', availableQty: 50, costPerUnit: 80, supplier: 'Rice Mills' },
      { id: 'B007', stockedDate: '2025-08-01', expiryDate: '2025-12-15', availableQty: 150, costPerUnit: 80, supplier: 'Rice Mills' }
    ],
    3: [ // Bath Towels batches
      { id: 'B008', stockedDate: '2025-07-10', expiryDate: '', availableQty: 20, costPerUnit: 350, supplier: 'Linen Co' },
      { id: 'B009', stockedDate: '2025-07-20', expiryDate: '', availableQty: 25, costPerUnit: 350, supplier: 'Linen Co' }
    ]
  };

  const allItems = {
    Food: [
      { id: 1, name: 'Milk', unit: 'Litre', minStock: 20, type: 'Consumable', status: 'Active', currentStock: 75 },
      { id: 6, name: 'Rice', unit: 'Kg', minStock: 50, type: 'Consumable', status: 'Active', currentStock: 200 },
      { id: 9, name: 'Cooking Oil', unit: 'Litre', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 25 },  
      { id: 10, name: 'Sugar', unit: 'Kg', minStock: 15, type: 'Consumable', status: 'Active', currentStock: 30 },
      { id: 11, name: 'Tea Bags', unit: 'Box', minStock: 5, type: 'Consumable', status: 'Active', currentStock: 12 }
    ],
    Cleaning: [
      { id: 2, name: 'Toilet Paper', unit: 'Roll', minStock: 15, type: 'Consumable', status: 'Active', currentStock: 95 },
      { id: 4, name: 'All-Purpose Cleaner', unit: 'Bottle', minStock: 10, type: 'Consumable', status: 'Active', currentStock: 25 },
      { id: 7, name: 'Detergent', unit: 'Packet', minStock: 8, type: 'Consumable', status: 'Active', currentStock: 15 },
      { id: 12, name: 'Floor Cleaner', unit: 'Bottle', minStock: 6, type: 'Consumable', status: 'Active', currentStock: 18 },
      { id: 13, name: 'Glass Cleaner', unit: 'Bottle', minStock: 4, type: 'Consumable', status: 'Active', currentStock: 8 }
    ],
    Linen: [
      { id: 3, name: 'Bath Towels', unit: 'Piece', minStock: 30, type: 'Non-Consumable', status: 'Active', currentStock: 45 },
      { id: 5, name: 'Bed Sheets', unit: 'Set', minStock: 20, type: 'Non-Consumable', status: 'Active', currentStock: 35 },
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

  // FIFO Logic - Auto fill batches based on stocked date
  useEffect(() => {
    if (autoFillFIFO && stockOutForm.totalQuantity && stockOutForm.item) {
      const batches = mockBatches[parseInt(stockOutForm.item)] || [];
      
      if (batches.length > 0) {
        const sortedBatches = [...batches].sort((a, b) => new Date(a.stockedDate) - new Date(b.stockedDate));
        let remaining = parseFloat(stockOutForm.totalQuantity) || 0;
        const newSelection = {};
        
        for (const batch of sortedBatches) {
          if (remaining <= 0) break;
          const takeQty = Math.min(remaining, batch.availableQty);
          if (takeQty > 0) {
            newSelection[batch.id] = takeQty;
            remaining -= takeQty;
          }
        }
        
        setSelectedBatches(newSelection);
      }
    }
  }, [autoFillFIFO, stockOutForm.totalQuantity, stockOutForm.item, stockOutForm.category]);

  const handleStockOutSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(false);
    
    const selectedItem = allItems[stockOutForm.category]?.find(item => item.id === parseInt(stockOutForm.item));
    if (!selectedItem) return;

    const batches = mockBatches[parseInt(stockOutForm.item)] || [];
    const selectedBatchDetails = batches.filter(batch => selectedBatches[batch.id]);
    
    const totalExpense = selectedBatchDetails.reduce((sum, batch) => 
      sum + (selectedBatches[batch.id] * batch.costPerUnit), 0
    );

    const newEntries = selectedBatchDetails.map((batch, index) => ({
      id: stockOutEntries.length + index + 1,
      date: stockOutForm.outDate,
      item: selectedItem.name,
      category: stockOutForm.category,
      qty: selectedBatches[batch.id],
      unit: selectedItem.unit,
      department: stockOutForm.department,
      reason: stockOutForm.reason,
      batchId: batch.id,
      expense: selectedBatches[batch.id] * batch.costPerUnit,
      remarks: stockOutForm.remarks,
      status: 'Completed'
    }));

    setStockOutEntries(prev => [...newEntries, ...prev]);
    
    // Reset form
    setStockOutForm({
      item: '',
      category: '',
      totalQuantity: '',
      department: 'Kitchen',
      outDate: new Date().toISOString().split('T')[0],
      reason: '',
      remarks: ''
    });
    setSelectedBatches({});
    
    alert(`Stock out recorded successfully! Total entries: ${newEntries.length}, Total value: ₹${totalExpense}`);
  };

  const handleFormChange = (field, value) => {
    setStockOutForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Reset batches when item changes
    if (field === 'item' || field === 'category') {
      setSelectedBatches({});
    }
  };

  const handleBatchQuantityChange = (batchId, quantity) => {
    const newQuantity = Math.max(0, parseFloat(quantity) || 0);
    setSelectedBatches(prev => {
      const updated = { ...prev };
      if (newQuantity > 0) {
        updated[batchId] = newQuantity;
      } else {
        delete updated[batchId];
      }
      return updated;
    });
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
    let filtered = stockOutEntries;

    if (searchTerm) {
      filtered = filtered.filter(entry => 
        entry.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.batchId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (dateFilter) {
      filtered = filtered.filter(entry => entry.date === dateFilter);
    }

    return filtered;
  };

  const selectedItem = allItems[stockOutForm.category]?.find(item => item.id === parseInt(stockOutForm.item));
  const availableBatches = selectedItem ? mockBatches[selectedItem.id] || [] : [];
  const totalSelectedQty = Object.values(selectedBatches).reduce((sum, qty) => sum + (qty || 0), 0);
  const totalExpense = availableBatches.reduce((sum, batch) => 
    sum + ((selectedBatches[batch.id] || 0) * batch.costPerUnit), 0
  );

  const getDaysRemaining = (expiryDate) => {
    if (!expiryDate) return null;
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getExpiryBadge = (days) => {
    if (days === null) return <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-800 rounded-full">No Expiry</span>;
    if (days <= 7) return <span className="px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded-full">⚠️ {days} days</span>;
    if (days <= 30) return <span className="px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full">⏰ {days} days</span>;
    return <span className="px-2 py-0.5 text-xs bg-green-100 text-green-800 rounded-full">✅ {days} days</span>;
  };

  const canProceedToConfirmation = selectedItem && totalSelectedQty > 0 && stockOutForm.department && stockOutForm.reason;

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🖥️ Stock Out Management</h1>
            <p className="text-gray-600 mt-1">Issue inventory items with batch tracking and department allocation</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Filters</span>
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-sm font-medium">Today's Stock Out</p>
                <p className="text-2xl font-bold text-red-700">₹{stockOutEntries.filter(e => e.date === new Date().toISOString().split('T')[0]).reduce((sum, e) => sum + e.expense, 0).toLocaleString()}</p>
              </div>
              <ArrowDownRight className="h-6 w-6 text-red-500" />
            </div>
          </div>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Entries Today</p>
                <p className="text-2xl font-bold text-orange-700">{stockOutEntries.filter(e => e.date === new Date().toISOString().split('T')[0]).length}</p>
              </div>
              <TrendingDown className="h-6 w-6 text-orange-500" />
            </div>
          </div>
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600 text-sm font-medium">Total Departments</p>
                <p className="text-2xl font-bold text-purple-700">{departments.length}</p>
              </div>
              <Building2 className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-600 text-sm font-medium">Active Items</p>
                <p className="text-2xl font-bold text-blue-700">{Object.values(allItems).flat().length}</p>
              </div>
              <Package className="h-6 w-6 text-blue-500" />
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
                  value={activeStockOutTab}
                  onChange={(e) => setActiveStockOutTab(e.target.value)}
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
                  <option value="low-stock">Low Stock</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setDateFilter(new Date().toISOString().split('T')[0]);
                    setFilterStatus('all');
                    setActiveStockOutTab('Food');
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
          {/* Left Side - Item Selection (2/3 width) */}
          <div className="xl:col-span-2 space-y-6">
            {/* Step 1: Category and Item Selection */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">📦 Step 1: Select Item by Category</h2>
                <p className="text-sm text-gray-600">Choose category and item for stock out</p>
              </div>
              
              {/* Category Navigation */}
              <div className="border-b border-gray-200">
                <nav className="flex overflow-x-auto">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveStockOutTab(category);
                        setStockOutForm(prev => ({ ...prev, item: '', category: '' }));
                        setSelectedBatches({});
                      }}
                      className={`flex-shrink-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeStockOutTab === category
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

              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder={`Search items in ${activeStockOutTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
                  {getFilteredItems(activeStockOutTab).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        handleFormChange('category', activeStockOutTab);
                        handleFormChange('item', item.id.toString());
                      }}
                      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        stockOutForm.item === item.id.toString() 
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
                          <p className="text-sm font-medium text-gray-900">Available: {item.currentStock}</p>
                          <p className="text-xs text-gray-500">Min: {item.minStock}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {getFilteredItems(activeStockOutTab).length === 0 && (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">No items found in this category</p>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Batch Selection (only show if item is selected) */}
            {selectedItem && availableBatches.length > 0 && (
              <div className="bg-white rounded-xl border border-gray-200">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">🔄 Step 2: Auto or Manual Batch Selection</h2>
                      <p className="text-sm text-gray-600">Select batches for <span className="font-medium text-blue-600">{selectedItem.name}</span></p>
                    </div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={autoFillFIFO}
                        onChange={(e) => setAutoFillFIFO(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Auto FIFO</span>
                    </label>
                  </div>
                </div>

                {/* Total Quantity Input */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Total Required Quantity
                      </label>
                      <input
                        type="number"
                        value={stockOutForm.totalQuantity}
                        onChange={(e) => handleFormChange('totalQuantity', e.target.value)}
                        placeholder={`Enter quantity in ${selectedItem.unit}`}
                        min="0.01"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 w-full">
                        <div className="text-sm text-blue-600">Total Selected</div>
                        <div className="text-xl font-bold text-blue-700">{totalSelectedQty} {selectedItem.unit}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Available Batches Overview */}
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Available Batches Overview
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500">
                          <th className="py-2">Batch ID</th>
                          <th className="py-2">Stock Date</th>
                          <th className="py-2">Expiry</th>
                          <th className="py-2">Available</th>
                          <th className="py-2">Cost/Unit</th>
                          <th className="py-2">Selected</th>
                          <th className="py-2">Value</th>
                        </tr>
                      </thead>
                      <tbody className="space-y-1">
                        {availableBatches.map((batch) => {
                          const daysRemaining = getDaysRemaining(batch.expiryDate);
                          const selectedQty = selectedBatches[batch.id] || 0;
                          const batchValue = selectedQty * batch.costPerUnit;
                          
                          return (
                            <tr key={batch.id} className="border-t border-gray-200">
                              <td className="py-2 font-medium">{batch.id}</td>
                              <td className="py-2">{new Date(batch.stockedDate).toLocaleDateString()}</td>
                              <td className="py-2">{getExpiryBadge(daysRemaining)}</td>
                              <td className="py-2">{batch.availableQty} {selectedItem.unit}</td>
                              <td className="py-2">₹{batch.costPerUnit}</td>
                              <td className="py-2">
                                <input
                                  type="number"
                                  value={selectedQty}
                                  onChange={(e) => handleBatchQuantityChange(batch.id, e.target.value)}
                                  max={batch.availableQty}
                                  min="0"
                                  step="0.01"
                                  className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                  disabled={autoFillFIFO}
                                />
                              </td>
                              <td className="py-2 font-medium">₹{batchValue.toFixed(2)}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Summary */}
                  <div className="mt-4 flex justify-between items-center text-sm">
                    <span className="text-gray-600">
                      Total Batches: {availableBatches.length} | 
                      Selected: {Object.keys(selectedBatches).length} | 
                      Quantity: {totalSelectedQty} {selectedItem.unit}
                    </span>
                    <span className="font-bold text-green-600">Total Value: ₹{totalExpense.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Form and Actions (1/3 width) */}
          <div className="space-y-6">
            {/* Step 3: Department & Details */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">📝 Step 3: Stock Out Details</h2>
                <p className="text-sm text-gray-600">Complete the stock out information</p>
              </div>
              
              <form onSubmit={(e) => { e.preventDefault(); setShowConfirmation(true); }} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={stockOutForm.department}
                    onChange={(e) => handleFormChange('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
                  <input
                    type="date"
                    value={stockOutForm.outDate}
                    onChange={(e) => handleFormChange('outDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reason/Purpose *</label>
                  <select
                    value={stockOutForm.reason}
                    onChange={(e) => handleFormChange('reason', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select reason...</option>
                    {reasons.map(reason => (
                      <option key={reason} value={reason}>{reason}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
                  <textarea
                    value={stockOutForm.remarks}
                    onChange={(e) => handleFormChange('remarks', e.target.value)}
                    placeholder="Additional notes or comments..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    rows="3"
                  />
                </div>

                {/* Selected Item Summary */}
                {selectedItem && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Selected Item Summary</h4>
                    <div className="space-y-1 text-sm text-blue-800">
                      <p><span className="font-medium">Item:</span> {selectedItem.name}</p>
                      <p><span className="font-medium">Category:</span> {stockOutForm.category}</p>
                      <p><span className="font-medium">Total Quantity:</span> {totalSelectedQty} {selectedItem.unit}</p>
                      <p><span className="font-medium">Total Value:</span> ₹{totalExpense.toFixed(2)}</p>
                      <p><span className="font-medium">Batches:</span> {Object.keys(selectedBatches).length}</p>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!canProceedToConfirmation}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-colors ${
                    canProceedToConfirmation
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {canProceedToConfirmation ? '✅ Review & Confirm Stock Out' : '⚠️ Complete Required Fields'}
                </button>
              </form>
            </div>

            {/* Recent Stock Out Entries */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">📊 Recent Stock Out Entries</h2>
                <p className="text-sm text-gray-600">Latest stock out transactions</p>
              </div>
              
              <div className="p-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {getFilteredStockEntries().slice(0, 10).map((entry) => (
                    <div key={entry.id} className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{entry.item}</h4>
                        <span className="text-xs text-gray-500">{entry.date}</span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p><span className="font-medium">Qty:</span> {entry.qty} {entry.unit}</p>
                        <p><span className="font-medium">Dept:</span> {entry.department}</p>
                        <p><span className="font-medium">Reason:</span> {entry.reason}</p>
                        <p><span className="font-medium">Batch:</span> {entry.batchId}</p>
                        <p><span className="font-medium">Value:</span> ₹{entry.expense}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {getFilteredStockEntries().length === 0 && (
                  <div className="text-center py-8">
                    <Clock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No stock out entries found</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmation && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">🔍 Confirm Stock Out Transaction</h2>
                <p className="text-sm text-gray-600">Please review the details before confirming</p>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Transaction Summary */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Transaction Summary</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Item:</span>
                      <p className="font-medium">{selectedItem?.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Category:</span>
                      <p className="font-medium">{stockOutForm.category}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Department:</span>
                      <p className="font-medium">{stockOutForm.department}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Date:</span>
                      <p className="font-medium">{new Date(stockOutForm.outDate).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Reason:</span>
                      <p className="font-medium">{stockOutForm.reason}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Quantity:</span>
                      <p className="font-medium">{totalSelectedQty} {selectedItem?.unit}</p>
                    </div>
                  </div>
                  {stockOutForm.remarks && (
                    <div className="mt-3">
                      <span className="text-gray-600 text-sm">Remarks:</span>
                      <p className="font-medium text-sm">{stockOutForm.remarks}</p>
                    </div>
                  )}
                </div>

                {/* Batch Details */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Batch Breakdown</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Batch ID</th>
                          <th className="px-4 py-2 text-left">Quantity</th>
                          <th className="px-4 py-2 text-left">Cost/Unit</th>
                          <th className="px-4 py-2 text-left">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {availableBatches
                          .filter(batch => selectedBatches[batch.id])
                          .map((batch) => (
                            <tr key={batch.id} className="border-t border-gray-200">
                              <td className="px-4 py-2 font-medium">{batch.id}</td>
                              <td className="px-4 py-2">{selectedBatches[batch.id]} {selectedItem?.unit}</td>
                              <td className="px-4 py-2">₹{batch.costPerUnit}</td>
                              <td className="px-4 py-2 font-medium">₹{(selectedBatches[batch.id] * batch.costPerUnit).toFixed(2)}</td>
                            </tr>
                          ))}
                      </tbody>
                      <tfoot className="bg-gray-50">
                        <tr>
                          <td colSpan="3" className="px-4 py-2 font-medium text-right">Total Value:</td>
                          <td className="px-4 py-2 font-bold text-green-600">₹{totalExpense.toFixed(2)}</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStockOutSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Check className="h-4 w-4" />
                  <span>Confirm Stock Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelStockOutSystem;