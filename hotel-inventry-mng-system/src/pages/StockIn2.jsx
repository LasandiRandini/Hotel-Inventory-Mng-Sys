// pages/StockInPage.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Package, ArrowUpRight, BarChart3 } from 'lucide-react';
import { fetchStockInEntries } from '../features/stockInSlice';
import { fetchItemsByCategory } from '../features/itemsSlice';
import StatsCard from '../components/common/StatsCard';
import ItemSelection from '../components/common/ItemSelection';
import StockInForm from '../components/common/StockInForm';
import PageHeader from '../components/common/PageHeader';

const StockInPage = () => {
  const dispatch = useDispatch();
  const { stats, filters } = useSelector(state => state.stockIn);

  useEffect(() => {
    dispatch(fetchStockInEntries(filters));
    dispatch(fetchItemsByCategory('Food')); // Default category
  }, [dispatch]);

  const statsData = [
    {
      title: "Today's Stock In",
      value: `₹${stats.todayValue?.toLocaleString() || 0}`,
      icon: Package,
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      valueColor: 'text-blue-700',
      iconColor: 'text-blue-500'
    },
    {
      title: "Entries Today",
      value: stats.entriesCount || 0,
      icon: ArrowUpRight,
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      valueColor: 'text-green-700',
      iconColor: 'text-green-500'
    },
    {
      title: "Active Batches",
      value: stats.activeBatches || 0,
      icon: BarChart3,
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      valueColor: 'text-purple-700',
      iconColor: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <PageHeader 
          title="Stock In Management"
          description="Add new inventory stock with batch tracking and comprehensive management"
        />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <ItemSelection />
          </div>
          <div>
            <StockInForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockInPage;