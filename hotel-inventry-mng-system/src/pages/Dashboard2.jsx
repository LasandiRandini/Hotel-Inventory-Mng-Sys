import React, { useState, useMemo } from 'react';
import { 
  Package, 
  ArrowUpRight, 
  ArrowDownRight, 
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Building2,
  Calendar,
  DollarSign,
  Eye,
  FileText,
  BarChart3,
  Plus,
  Search,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  ShoppingCart,
  Archive,
  RotateCcw
} from 'lucide-react';

// Mock data
const MOCK_DATA = {
  todayStats: {
    stockIn: { count: 15, value: 45000 },
    stockOut: { count: 23, value: 18500 },
    available: { total: 1250, lowStock: 12 }
  },
  recentActivities: [
    { id: 1, type: 'IN', item: 'Rice', qty: 50, unit: 'Kg', department: 'Kitchen', time: '10:30 AM', value: 4000 },
    { id: 2, type: 'OUT', item: 'Toilet Paper', qty: 20, unit: 'Roll', department: 'Housekeeping', time: '09:45 AM', value: 500 },
    { id: 3, type: 'OUT', item: 'Milk', qty: 15, unit: 'Litre', department: 'Kitchen', time: '09:15 AM', value: 900 },
    { id: 4, type: 'IN', item: 'Bath Towels', qty: 30, unit: 'Piece', department: 'Housekeeping', time: '08:30 AM', value: 10500 },
    { id: 5, type: 'RETURN', item: 'Bed Sheets', qty: 5, unit: 'Set', department: 'Housekeeping', time: '08:00 AM', value: 0 }
  ],
  categoryStock: [
    { category: 'Food', total: 450, available: 420, lowStock: 3, value: 125000 },
    { category: 'Cleaning', total: 280, available: 265, lowStock: 5, value: 45000 },
    // { category: 'Linen', total: 320, available: 310, lowStock: 2, value: 180000 },
    // { category: 'Maintenance', total: 150, available: 140, lowStock: 1, value: 25000 },
    // { category: 'Amenities', total: 50, available: 45, lowStock: 1, value: 15000 }
  ],
  weeklyTrend: [
    { day: 'Mon', stockIn: 25000, stockOut: 15000 },
    { day: 'Tue', stockIn: 30000, stockOut: 18000 },
    { day: 'Wed', stockIn: 20000, stockOut: 22000 },
    { day: 'Thu', stockIn: 35000, stockOut: 16000 },
    { day: 'Fri', stockIn: 28000, stockOut: 19000 },
    { day: 'Sat', stockIn: 45000, stockOut: 18500 },
    { day: 'Sun', stockIn: 15000, stockOut: 12000 }
  ]
};

const NAVIGATION_ITEMS = [
  { id: 'stock-in', label: 'Stock In', icon: ArrowUpRight, color: 'green', description: 'Add new inventory items' },
  { id: 'stock-out', label: 'Stock Out', icon: ArrowDownRight, color: 'red', description: 'Issue items to departments' },
  { id: 'available-stock', label: 'Available Stock', icon: Package, color: 'blue', description: 'View current inventory' },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, color: 'purple', description: 'Expense & usage reports' },
  { id: 'logs', label: 'Activity Logs', icon: FileText, color: 'orange', description: 'All transaction history' },
  { id: 'returns', label: 'Returns', icon: RotateCcw, color: 'teal', description: 'Non-consumable returns' }
];

const formatCurrency = (amount) => `₹${amount.toLocaleString()}`;
const formatTime = (time) => time;

const StatCard = ({ title, value, change, changeType, icon: Icon, color, description }) => (
  <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-6 hover:shadow-lg transition-all duration-200`}>
    <div className="flex items-center justify-between mb-4">
      <div>
        <p className={`text-${color}-600 text-sm font-medium`}>{title}</p>
        <p className={`text-2xl font-bold text-${color}-700`}>{value}</p>
      </div>
      <Icon className={`h-8 w-8 text-${color}-500`} />
    </div>
    {change && (
      <div className="flex items-center text-sm">
        {changeType === 'up' ? (
          <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
        ) : (
          <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
        )}
        <span className={changeType === 'up' ? 'text-green-600' : 'text-red-600'}>
          {change}
        </span>
        <span className="text-gray-500 ml-1">vs yesterday</span>
      </div>
    )}
    {description && (
      <p className="text-gray-600 text-xs mt-2">{description}</p>
    )}
  </div>
);

const ActivityItem = ({ activity }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'IN': return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'OUT': return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      case 'RETURN': return <RotateCcw className="h-4 w-4 text-blue-600" />;
      default: return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'IN': return 'bg-green-100 text-green-800';
      case 'OUT': return 'bg-red-100 text-red-800';
      case 'RETURN': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="flex items-center space-x-3">
        <div className={`p-2 rounded-full ${getActivityColor(activity.type)}`}>
          {getActivityIcon(activity.type)}
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{activity.item}</h4>
          <p className="text-sm text-gray-600">
            {activity.qty} {activity.unit} • {activity.department}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{activity.time}</p>
        {activity.value > 0 && (
          <p className="text-sm text-gray-600">{formatCurrency(activity.value)}</p>
        )}
      </div>
    </div>
  );
};

const NavigationCard = ({ item, onClick }) => (
  <div 
    onClick={() => onClick(item.id)}
    className={`bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-${item.color}-300 hover:shadow-lg transition-all duration-200 cursor-pointer group`}
  >
    <div className={`inline-flex p-3 rounded-lg bg-${item.color}-100 text-${item.color}-600 mb-4 group-hover:bg-${item.color}-200 transition-colors`}>
      <item.icon className="h-6 w-6" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.label}</h3>
    <p className="text-gray-600 text-sm mb-4">{item.description}</p>
    <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700">
      <span>Access Module</span>
      <ChevronRight className="h-4 w-4 ml-1" />
    </div>
  </div>
);

const CategoryStockCard = ({ category }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4">
    <div className="flex justify-between items-start mb-3">
      <h4 className="font-medium text-gray-900">{category.category}</h4>
      {category.lowStock > 0 && (
        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          {category.lowStock} Low
        </span>
      )}
    </div>
    <div className="space-y-2 text-sm">
      <div className="flex justify-between">
        <span className="text-gray-600">Total Items:</span>
        <span className="font-medium">{category.total}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Available:</span>
        <span className="font-medium text-green-600">{category.available}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-gray-600">Total Value:</span>
        <span className="font-medium">{formatCurrency(category.value)}</span>
      </div>
    </div>
    <div className="mt-3">
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${(category.available / category.total) * 100}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-1">
        {Math.round((category.available / category.total) * 100)}% Available
      </p>
    </div>
  </div>
);

const HotelInventoryDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [activeModule, setActiveModule] = useState(null);

  const handleModuleClick = (moduleId) => {
    setActiveModule(moduleId);
    // Here you would navigate to the respective module
    console.log(`Navigating to ${moduleId}`);
  };

  const totalValue = useMemo(() => 
    MOCK_DATA.categoryStock.reduce((sum, cat) => sum + cat.value, 0),
    []
  );

  const lowStockTotal = useMemo(() => 
    MOCK_DATA.categoryStock.reduce((sum, cat) => sum + cat.lowStock, 0),
    []
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">🏨 Hotel Inventory Management</h1>
            <p className="text-gray-600 mt-1">Complete inventory tracking and management system</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Today's Stock In"
            value={formatCurrency(MOCK_DATA.todayStats.stockIn.value)}
            change="+12%"
            changeType="up"
            icon={ArrowUpRight}
            color="green"
            description={`${MOCK_DATA.todayStats.stockIn.count} transactions`}
          />
          <StatCard
            title="Today's Stock Out"
            value={formatCurrency(MOCK_DATA.todayStats.stockOut.value)}
            change="+8%"
            changeType="up"
            icon={ArrowDownRight}
            color="red"
            description={`${MOCK_DATA.todayStats.stockOut.count} transactions`}
          />
          <StatCard
            title="Available Items"
            value={MOCK_DATA.todayStats.available.total}
            change="-2%"
            changeType="down"
            icon={Package}
            color="blue"
            description="Across all categories"
          />
          <StatCard
            title="Low Stock Alerts"
            value={lowStockTotal}
            change="+3"
            changeType="up"
            icon={AlertTriangle}
            color="orange"
            description="Items below minimum threshold"
          />
        </div>

        {/* Quick Navigation */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Access Modules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {NAVIGATION_ITEMS.map((item) => (
              <NavigationCard 
                key={item.id} 
                item={item} 
                onClick={handleModuleClick}
              />
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {MOCK_DATA.recentActivities.map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Category Overview */}
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="border-b border-gray-200 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Category Overview</h2>
              <p className="text-sm text-gray-600">Stock levels by category</p>
            </div>
            <div className="p-6">
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-blue-900">Total Inventory Value</span>
                  <DollarSign className="h-4 w-4 text-blue-600" />
                </div>
                <p className="text-xl font-bold text-blue-700">{formatCurrency(totalValue)}</p>
              </div>
              <div className="space-y-4">
                {MOCK_DATA.categoryStock.map((category) => (
                  <CategoryStockCard key={category.category} category={category} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Weekly Trend</h2>
          <div className="h-64 flex items-end justify-between space-x-2">
            {MOCK_DATA.weeklyTrend.map((day, index) => (
              <div key={day.day} className="flex-1 flex flex-col items-center space-y-2">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="bg-green-400 rounded-t-sm" 
                    style={{ height: `${(day.stockIn / 50000) * 200}px`, minHeight: '4px' }}
                    title={`Stock In: ${formatCurrency(day.stockIn)}`}
                  />
                  <div 
                    className="bg-red-400 rounded-b-sm" 
                    style={{ height: `${(day.stockOut / 50000) * 200}px`, minHeight: '4px' }}
                    title={`Stock Out: ${formatCurrency(day.stockOut)}`}
                  />
                </div>
                <span className="text-xs text-gray-600 font-medium">{day.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded"></div>
              <span className="text-sm text-gray-600">Stock In</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-400 rounded"></div>
              <span className="text-sm text-gray-600">Stock Out</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInventoryDashboard;