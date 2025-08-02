//dashboard
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
  RefreshCw
} from 'lucide-react';

const HotelInventorySystem = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample data
  const dashboardStats = {
    lowStockAlerts: 8,
    todayMovements: { in: 12, out: 28, returned: 3 },
    todayExpenses: 15420.50,
    topUsedItems: [
      { name: 'Toilet Paper', qty: 24, cost: 2400 },
      { name: 'Towels', qty: 18, cost: 3600 },
      { name: 'Milk', qty: 15, cost: 1800 }
    ],
    departmentSummary: [
      { dept: 'Housekeeping', items: 45, expense: 8200 },
      { dept: 'Kitchen', items: 32, expense: 6800 },
      { dept: 'Maintenance', items: 8, expense: 420 }
    ]
  };

  const categories = ['All', 'Food', 'Cleaning', 'Linen', 'Maintenance', 'Amenities'];
  
  const items = [
    { id: 1, name: 'Milk', category: 'Food', unit: 'Litre', currentStock: 100, minStock: 20, type: 'Consumable', status: 'Active' },
    { id: 2, name: 'Toilet Paper', category: 'Cleaning', unit: 'Roll', currentStock: 5, minStock: 15, type: 'Consumable', status: 'Active' },
    { id: 3, name: 'Bath Towels', category: 'Linen', unit: 'Piece', currentStock: 45, minStock: 30, type: 'Non-Consumable', status: 'Active' },
    { id: 4, name: 'All-Purpose Cleaner', category: 'Cleaning', unit: 'Bottle', currentStock: 25, minStock: 10, type: 'Consumable', status: 'Active' },
    { id: 5, name: 'Bed Sheets', category: 'Linen', unit: 'Set', currentStock: 8, minStock: 20, type: 'Non-Consumable', status: 'Active' }
  ];

  const filteredItems = selectedCategory === 'all' ? items : items.filter(item => item.category.toLowerCase() === selectedCategory.toLowerCase());

  const Dashboard = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Hotel Inventory Management Overview</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last updated</p>
          <p className="text-sm font-medium">Just now</p>
        </div>
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Low Stock Alerts */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Low Stock Alerts</p>
              <p className="text-3xl font-bold text-red-700 mt-2">{dashboardStats.lowStockAlerts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <p className="text-red-600 text-xs mt-2">Items below threshold</p>
        </div>

        {/* Today's Movements */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Today's Movements</p>
              <div className="flex space-x-4 mt-2">
                <span className="text-green-600 text-sm flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  In: {dashboardStats.todayMovements.in}
                </span>
                <span className="text-red-600 text-sm flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  Out: {dashboardStats.todayMovements.out}
                </span>
              </div>
            </div>
            <Package className="h-8 w-8 text-blue-500" />
          </div>
          <p className="text-blue-600 text-xs mt-2">Returned: {dashboardStats.todayMovements.returned}</p>
        </div>

        {/* Today's Expenses */}
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Today's Expenses</p>
              <p className="text-3xl font-bold text-green-700 mt-2">₹{dashboardStats.todayExpenses.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-green-600 text-xs mt-2">Consumables only</p>
        </div>

        {/* Department Activity */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Active Departments</p>
              <p className="text-3xl font-bold text-purple-700 mt-2">{dashboardStats.departmentSummary.length}</p>
            </div>
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <p className="text-purple-600 text-xs mt-2">Using inventory today</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Used Items */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Top Used Items</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {dashboardStats.topUsedItems.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="text-lg font-semibold text-gray-900">₹{item.cost.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Summary */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Usage</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {dashboardStats.departmentSummary.map((dept, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{dept.dept}</p>
                  <p className="text-sm text-gray-500">{dept.items} items used</p>
                </div>
                <span className="text-lg font-semibold text-gray-900">₹{dept.expense.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const InventoryManagement = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage your hotel inventory items</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Add Item</span>
        </button>
      </div>

      {/* Category Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                selectedCategory === category.toLowerCase()
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          <Filter className="h-4 w-4" />
          <span>Filter</span>
        </button>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Min Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.unit}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className={`text-sm font-medium ${item.currentStock <= item.minStock ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.currentStock}
                      </span>
                      {item.currentStock <= item.minStock && (
                        <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.minStock}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      item.type === 'Consumable' ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50 transition-colors">
                        <Edit3 className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredItems.length}</span> of{' '}
          <span className="font-medium">{items.length}</span> results
        </div>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Hotel Inventory</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                    currentView === 'dashboard'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('inventory')}
                  className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors ${
                    currentView === 'inventory'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Inventory
                </button>
                <button className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                  Stock In
                </button>
                <button className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                  Stock Out
                </button>
                <button className="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors">
                  Reports
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-500">
                <RefreshCw className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin</span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {currentView === 'dashboard' ? <Dashboard /> : <InventoryManagement />}
      </main>
    </div>
  );
};

export default HotelInventorySystem;