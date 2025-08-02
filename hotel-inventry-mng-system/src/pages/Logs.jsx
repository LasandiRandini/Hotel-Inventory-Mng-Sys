import React, { useState, useMemo, useCallback } from 'react';
import { 
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  RotateCcw,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  ChevronDown,
  X,
  Building2,
  Package,
  DollarSign,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertCircle
} from 'lucide-react';

// Constants
const LOG_TYPES = {
  ALL: 'all',
  STOCK_IN: 'stock_in',
  STOCK_OUT: 'stock_out',
  RETURN: 'return'
};

const CATEGORIES = ['All', 'Food', 'Cleaning', 'Linen', 'Maintenance', 'Amenities'];
const DEPARTMENTS = ['All', 'Kitchen', 'Housekeeping', 'Front Desk', 'Maintenance', 'Restaurant', 'Bar', 'Laundry'];

// Mock data with comprehensive logs
const MOCK_LOGS = [
  // Today's logs
  { id: 1, date: '2025-08-02', time: '10:30', type: 'stock_in', item: 'Rice', category: 'Food', qty: 50, unit: 'Kg', batch: 'B007', department: 'Kitchen', supplier: 'Rice Mills', costPerUnit: 80, totalValue: 4000, isConsumable: true },
  { id: 2, date: '2025-08-02', time: '10:15', type: 'stock_out', item: 'Milk', category: 'Food', qty: 15, unit: 'Litre', batch: 'B001', department: 'Kitchen', reason: 'Cooking', costPerUnit: 60, totalValue: 900, isConsumable: true },
  { id: 3, date: '2025-08-02', time: '09:45', type: 'stock_out', item: 'Toilet Paper', category: 'Cleaning', qty: 20, unit: 'Roll', batch: 'B004', department: 'Housekeeping', reason: 'Room Service', costPerUnit: 25, totalValue: 500, isConsumable: true },
  { id: 4, date: '2025-08-02', time: '09:30', type: 'stock_in', item: 'Bath Towels', category: 'Linen', qty: 30, unit: 'Piece', batch: 'B010', department: 'Housekeeping', supplier: 'Linen Co', costPerUnit: 350, totalValue: 10500, isConsumable: false },
  { id: 5, date: '2025-08-02', time: '08:45', type: 'return', item: 'Bed Sheets', category: 'Linen', qty: 5, unit: 'Set', batch: 'B008', department: 'Housekeeping', reason: 'Damaged', costPerUnit: 800, totalValue: 0, isConsumable: false },
  { id: 6, date: '2025-08-02', time: '08:15', type: 'stock_out', item: 'Cooking Oil', category: 'Food', qty: 2, unit: 'Litre', batch: 'B005', department: 'Kitchen', reason: 'Cooking', costPerUnit: 150, totalValue: 300, isConsumable: true },
  
  // Yesterday's logs
  { id: 7, date: '2025-08-01', time: '16:30', type: 'stock_out', item: 'All-Purpose Cleaner', category: 'Cleaning', qty: 5, unit: 'Bottle', batch: 'B006', department: 'Housekeeping', reason: 'Cleaning', costPerUnit: 120, totalValue: 600, isConsumable: true },
  { id: 8, date: '2025-08-01', time: '15:45', type: 'stock_in', item: 'Sugar', category: 'Food', qty: 25, unit: 'Kg', batch: 'B009', department: 'Kitchen', supplier: 'Sweet Co', costPerUnit: 45, totalValue: 1125, isConsumable: true },
  { id: 9, date: '2025-08-01', time: '14:20', type: 'return', item: 'Pillow Cases', category: 'Linen', qty: 8, unit: 'Piece', batch: 'B007', department: 'Housekeeping', reason: 'Stained', costPerUnit: 200, totalValue: 0, isConsumable: false },
  { id: 10, date: '2025-08-01', time: '13:15', type: 'stock_out', item: 'Detergent', category: 'Cleaning', qty: 3, unit: 'Packet', batch: 'B003', department: 'Laundry', reason: 'Washing', costPerUnit: 85, totalValue: 255, isConsumable: true },
  
  // Last week's logs
  { id: 11, date: '2025-07-31', time: '11:00', type: 'stock_in', item: 'Light Bulbs', category: 'Maintenance', qty: 50, unit: 'Piece', batch: 'B011', department: 'Maintenance', supplier: 'Electric Co', costPerUnit: 25, totalValue: 1250, isConsumable: true },
  { id: 12, date: '2025-07-30', time: '10:30', type: 'stock_out', item: 'Shampoo', category: 'Amenities', qty: 10, unit: 'Bottle', batch: 'B012', department: 'Housekeeping', reason: 'Guest Room', costPerUnit: 180, totalValue: 1800, isConsumable: true },
  { id: 13, date: '2025-07-29', time: '14:45', type: 'return', item: 'Blankets', category: 'Linen', qty: 3, unit: 'Piece', batch: 'B013', department: 'Housekeeping', reason: 'Torn', costPerUnit: 450, totalValue: 0, isConsumable: false }
];

// Utility functions
const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;
const formatDate = (date) => new Date(date).toLocaleDateString();
const formatDateTime = (date, time) => `${formatDate(date)} ${time}`;

const getTypeIcon = (type) => {
  switch (type) {
    case 'stock_in': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
    case 'stock_out': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
    case 'return': return <RotateCcw className="h-4 w-4 text-blue-600" />;
    default: return <Package className="h-4 w-4 text-gray-600" />;
  }
};

const getTypeBadge = (type) => {
  switch (type) {
    case 'stock_in': return <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">IN</span>;
    case 'stock_out': return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full font-medium">OUT</span>;
    case 'return': return <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">RETURN</span>;
    default: return <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full font-medium">-</span>;
  }
};

// Custom hooks
const useLogFilters = () => {
  const [filters, setFilters] = useState({
    activeTab: LOG_TYPES.ALL,
    dateRange: {
      start: new Date().toISOString().split('T')[0],
      end: new Date().toISOString().split('T')[0]
    },
    category: 'All',
    department: 'All',
    searchTerm: '',
    showAdvancedFilters: false
  });

  const updateFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const updateDateRange = useCallback((start, end) => {
    setFilters(prev => ({
      ...prev,
      dateRange: { start, end }
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      activeTab: LOG_TYPES.ALL,
      dateRange: {
        start: new Date().toISOString().split('T')[0],
        end: new Date().toISOString().split('T')[0]
      },
      category: 'All',
      department: 'All',
      searchTerm: '',
      showAdvancedFilters: false
    });
  }, []);

  return { filters, updateFilter, updateDateRange, resetFilters };
};

// Components
const QuickDateSelector = ({ onSelect, currentRange }) => {
  const quickOptions = [
    { label: 'Today', days: 0 },
    { label: 'Yesterday', days: 1, single: true },
    { label: 'Last 7 Days', days: 7 },
    { label: 'Last 30 Days', days: 30 },
    { label: 'This Month', custom: 'month' }
  ];

  const handleQuickSelect = (option) => {
    const today = new Date();
    let start, end;

    if (option.single) {
      const date = new Date(today);
      date.setDate(date.getDate() - option.days);
      start = end = date.toISOString().split('T')[0];
    } else if (option.custom === 'month') {
      start = new Date(today.getFullYear(), today.getMonth(), 1).toISOString().split('T')[0];
      end = today.toISOString().split('T')[0];
    } else {
      end = today.toISOString().split('T')[0];
      start = new Date(today.setDate(today.getDate() - option.days)).toISOString().split('T')[0];
    }

    onSelect(start, end);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {quickOptions.map((option) => (
        <button
          key={option.label}
          onClick={() => handleQuickSelect(option)}
          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

const LogSummaryCards = ({ logs, dateRange }) => {
  const summary = useMemo(() => {
    const stockIn = logs.filter(log => log.type === 'stock_in');
    const stockOut = logs.filter(log => log.type === 'stock_out');
    const returns = logs.filter(log => log.type === 'return');
    
    return {
      stockIn: {
        count: stockIn.length,
        value: stockIn.reduce((sum, log) => sum + (log.totalValue || 0), 0)
      },
      stockOut: {
        count: stockOut.length,
        value: stockOut.filter(log => log.isConsumable).reduce((sum, log) => sum + (log.totalValue || 0), 0)
      },
      returns: {
        count: returns.length,
        items: returns.reduce((sum, log) => sum + log.qty, 0)
      },
      netValue: stockIn.reduce((sum, log) => sum + (log.totalValue || 0), 0) - 
                 stockOut.filter(log => log.isConsumable).reduce((sum, log) => sum + (log.totalValue || 0), 0)
    };
  }, [logs]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-green-600 text-sm font-medium">Stock In</p>
            <p className="text-2xl font-bold text-green-700">{formatCurrency(summary.stockIn.value)}</p>
            <p className="text-green-600 text-xs">{summary.stockIn.count} transactions</p>
          </div>
          <ArrowUpRight className="h-6 w-6 text-green-500" />
        </div>
      </div>
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-600 text-sm font-medium">Stock Out (Expense)</p>
            <p className="text-2xl font-bold text-red-700">{formatCurrency(summary.stockOut.value)}</p>
            <p className="text-red-600 text-xs">{summary.stockOut.count} transactions</p>
          </div>
          <ArrowDownRight className="h-6 w-6 text-red-500" />
        </div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-600 text-sm font-medium">Returns</p>
            <p className="text-2xl font-bold text-blue-700">{summary.returns.items}</p>
            <p className="text-blue-600 text-xs">{summary.returns.count} returns</p>
          </div>
          <RotateCcw className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-purple-600 text-sm font-medium">Net Value</p>
            <p className={`text-2xl font-bold ${summary.netValue >= 0 ? 'text-green-700' : 'text-red-700'}`}>
              {formatCurrency(Math.abs(summary.netValue))}
            </p>
            <p className="text-purple-600 text-xs">
              {summary.netValue >= 0 ? 'Positive' : 'Negative'} flow
            </p>
          </div>
          {summary.netValue >= 0 ? 
            <TrendingUp className="h-6 w-6 text-green-500" /> : 
            <TrendingDown className="h-6 w-6 text-red-500" />
          }
        </div>
      </div>
    </div>
  );
};

const CategoryBreakdown = ({ logs }) => {
  const breakdown = useMemo(() => {
    const categories = {};
    
    logs.forEach(log => {
      if (!categories[log.category]) {
        categories[log.category] = { stockIn: 0, stockOut: 0, returns: 0, count: 0 };
      }
      
      categories[log.category].count++;
      
      if (log.type === 'stock_in') {
        categories[log.category].stockIn += log.totalValue || 0;
      } else if (log.type === 'stock_out' && log.isConsumable) {
        categories[log.category].stockOut += log.totalValue || 0;
      } else if (log.type === 'return') {
        categories[log.category].returns += log.qty;
      }
    });
    
    return Object.entries(categories).map(([category, data]) => ({
      category,
      ...data,
      netValue: data.stockIn - data.stockOut
    }));
  }, [logs]);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {breakdown.map(({ category, stockIn, stockOut, returns, count, netValue }) => (
          <div key={category} className="border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">{category}</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Transactions:</span>
                <span className="font-medium">{count}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-600">Stock In:</span>
                <span className="font-medium text-green-700">{formatCurrency(stockIn)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-600">Stock Out:</span>
                <span className="font-medium text-red-700">{formatCurrency(stockOut)}</span>
              </div>
              {returns > 0 && (
                <div className="flex justify-between">
                  <span className="text-blue-600">Returns:</span>
                  <span className="font-medium text-blue-700">{returns} items</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-900 font-medium">Net:</span>
                <span className={`font-bold ${netValue >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(Math.abs(netValue))}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LogTable = ({ logs, loading }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="h-6 w-6 text-gray-400 animate-spin mr-2" />
          <span className="text-gray-500">Loading logs...</span>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No logs found</h3>
          <p className="text-gray-500">No activity logs match your current filters.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Item
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Batch
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expense
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{formatDate(log.date)}</div>
                  <div className="text-sm text-gray-500">{log.time}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    {getTypeIcon(log.type)}
                    {getTypeBadge(log.type)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{log.item}</div>
                  <div className="text-sm text-gray-500">{log.category}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.qty} {log.unit}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-mono text-gray-900">{log.batch}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{log.department}</div>
                  {log.reason && (
                    <div className="text-sm text-gray-500">{log.reason}</div>
                  )}
                  {log.supplier && (
                    <div className="text-sm text-gray-500">by {log.supplier}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {log.type === 'stock_out' && log.isConsumable ? (
                    <div className="text-sm font-medium text-red-600">
                      -{formatCurrency(log.totalValue || 0)}
                    </div>
                  ) : log.type === 'stock_in' ? (
                    <div className="text-sm font-medium text-green-600">
                      +{formatCurrency(log.totalValue || 0)}
                    </div>
                  ) : (
                    <div className="text-sm text-gray-400">-</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-blue-600 hover:text-blue-900">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main component
const ActivityLogsSystem = () => {
  const { filters, updateFilter, updateDateRange, resetFilters } = useLogFilters();
  const [loading, setLoading] = useState(false);

  // Filter logs based on current filters
  const filteredLogs = useMemo(() => {
    let filtered = [...MOCK_LOGS];

    // Filter by tab
    if (filters.activeTab !== LOG_TYPES.ALL) {
      filtered = filtered.filter(log => log.type === filters.activeTab);
    }

    // Filter by date range
    filtered = filtered.filter(log => {
      const logDate = log.date;
      return logDate >= filters.dateRange.start && logDate <= filters.dateRange.end;
    });

    // Filter by category
    if (filters.category !== 'All') {
      filtered = filtered.filter(log => log.category === filters.category);
    }

    // Filter by department
    if (filters.department !== 'All') {
      filtered = filtered.filter(log => log.department === filters.department);
    }

    // Filter by search term
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(log => 
        log.item.toLowerCase().includes(term) ||
        log.batch.toLowerCase().includes(term) ||
        log.department.toLowerCase().includes(term) ||
        (log.supplier && log.supplier.toLowerCase().includes(term)) ||
        (log.reason && log.reason.toLowerCase().includes(term))
      );
    }

    // Sort by date and time (newest first)
    return filtered.sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);
      return dateB - dateA;
    });
  }, [filters]);

  const handleExport = useCallback(() => {
    // Implementation for export functionality
    console.log('Exporting logs...', filteredLogs);
    alert('Export functionality would be implemented here');
  }, [filteredLogs]);

  const tabItems = [
    { id: LOG_TYPES.ALL, label: 'All Logs', count: MOCK_LOGS.length },
    { id: LOG_TYPES.STOCK_IN, label: 'Stock In', count: MOCK_LOGS.filter(l => l.type === 'stock_in').length },
    { id: LOG_TYPES.STOCK_OUT, label: 'Stock Out', count: MOCK_LOGS.filter(l => l.type === 'stock_out').length },
    { id: LOG_TYPES.RETURN, label: 'Returns', count: MOCK_LOGS.filter(l => l.type === 'return').length }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">📋 Activity Logs</h1>
            <p className="text-gray-600 mt-1">Complete transaction history and expense tracking</p>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => updateFilter('showAdvancedFilters', !filters.showAdvancedFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Filter className="h-4 w-4" />
              <span>Advanced Filters</span>
            </button>
            <button 
              onClick={handleExport}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <Download className="h-4 w-4" />
              <span>Export</span>
            </button>
            <button 
              onClick={() => setLoading(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl border border-gray-200">
          <nav className="flex border-b border-gray-200">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                onClick={() => updateFilter('activeTab', tab.id)}
                className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  filters.activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>

          {/* Filters Section */}
          <div className="p-6 border-b border-gray-200">
            {/* Date Range & Quick Selectors */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <QuickDateSelector 
                onSelect={updateDateRange} 
                currentRange={filters.dateRange}
              />
              <div className="flex space-x-4">
                <input
                  type="date"
                  value={filters.dateRange.start}
                  onChange={(e) => updateDateRange(e.target.value, filters.dateRange.end)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <span className="flex items-center text-gray-500">to</span>
                <input
                  type="date"
                  value={filters.dateRange.end}
                  onChange={(e) => updateDateRange(filters.dateRange.start, e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Search */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search by item name, batch ID, department, supplier..."
                  value={filters.searchTerm}
                  onChange={(e) => updateFilter('searchTerm', e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {filters.searchTerm && (
                  <button
                    onClick={() => updateFilter('searchTerm', '')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Advanced Filters */}
            {filters.showAdvancedFilters && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={filters.category}
                    onChange={(e) => updateFilter('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                  <select
                    value={filters.department}
                    onChange={(e) => updateFilter('department', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {DEPARTMENTS.map(department => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}

            {/* Filter Summary */}
            <div className="flex items-center justify-between text-sm text-gray-600 mt-4">
              <span>
                Showing {filteredLogs.length} of {MOCK_LOGS.length} logs
                {filters.dateRange.start === filters.dateRange.end 
                  ? ` for ${formatDate(filters.dateRange.start)}`
                  : ` from ${formatDate(filters.dateRange.start)} to ${formatDate(filters.dateRange.end)}`
                }
              </span>
              {(filters.category !== 'All' || filters.department !== 'All' || filters.searchTerm) && (
                <button
                  onClick={resetFilters}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <LogSummaryCards logs={filteredLogs} dateRange={filters.dateRange} />

        {/* Category Breakdown */}
        {filteredLogs.length > 0 && <CategoryBreakdown logs={filteredLogs} />}

        {/* Logs Table */}
        <LogTable logs={filteredLogs} loading={loading} />

        {/* Pagination */}
        {filteredLogs.length > 50 && (
          <div className="bg-white rounded-xl border border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing 1 to {Math.min(50, filteredLogs.length)} of {filteredLogs.length} results
              </div>
              <div className="flex space-x-2">
                <button 
                  disabled
                  className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-400 cursor-not-allowed"
                >
                  Previous
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Additional Analytics */}
        {filteredLogs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Top Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Active Items</h3>
              <div className="space-y-3">
                {Object.entries(
                  filteredLogs.reduce((acc, log) => {
                    acc[log.item] = (acc[log.item] || 0) + 1;
                    return acc;
                  }, {})
                )
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([item, count]) => (
                  <div key={item} className="flex justify-between items-center">
                    <span className="text-gray-900">{item}</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {count} transactions
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Department Activity */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Activity</h3>
              <div className="space-y-3">
                {Object.entries(
                  filteredLogs.reduce((acc, log) => {
                    acc[log.department] = (acc[log.department] || 0) + 1;
                    return acc;
                  }, {})
                )
                .sort(([,a], [,b]) => b - a)
                .slice(0, 5)
                .map(([department, count]) => (
                  <div key={department} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Building2 className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-900">{department}</span>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {count} activities
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Expense Insights */}
        {filteredLogs.some(log => log.type === 'stock_out' && log.isConsumable) && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">💰 Expense Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Daily Average */}
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <DollarSign className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-700">
                  {formatCurrency(
                    filteredLogs
                      .filter(log => log.type === 'stock_out' && log.isConsumable)
                      .reduce((sum, log) => sum + (log.totalValue || 0), 0) /
                    Math.max(1, new Set(filteredLogs.map(log => log.date)).size)
                  )}
                </div>
                <div className="text-sm text-red-600">Daily Average Expense</div>
              </div>

              {/* Highest Single Transaction */}
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <AlertCircle className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-700">
                  {formatCurrency(
                    Math.max(
                      ...filteredLogs
                        .filter(log => log.type === 'stock_out' && log.isConsumable)
                        .map(log => log.totalValue || 0),
                      0
                    )
                  )}
                </div>
                <div className="text-sm text-orange-600">Highest Single Expense</div>
              </div>

              {/* Most Expensive Category */}
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-lg font-bold text-purple-700">
                  {Object.entries(
                    filteredLogs
                      .filter(log => log.type === 'stock_out' && log.isConsumable)
                      .reduce((acc, log) => {
                        acc[log.category] = (acc[log.category] || 0) + (log.totalValue || 0);
                        return acc;
                      }, {})
                  )
                  .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'}
                </div>
                <div className="text-sm text-purple-600">Most Expensive Category</div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Expense Calculation Note:</p>
              <p>Expenses are calculated only for consumable items during stock-out operations. Non-consumable items (like linens) are tracked for quantity but don't contribute to expense calculations as they are reusable assets.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLogsSystem;