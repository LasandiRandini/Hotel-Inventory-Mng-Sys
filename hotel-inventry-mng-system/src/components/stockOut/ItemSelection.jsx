// components/stockOut/ItemSelection.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, X, AlertTriangle, Package, Plus } from 'lucide-react';
import { updateFilter, updateForm } from '../../features/stockOutSlice';
import { setSelectedItem } from '../../features/itemsSlice';
import { CATEGORIES } from '../../data/mockData';

const ItemSelection = () => {
  const dispatch = useDispatch();
  const { filters, form } = useSelector(state => state.stockOut);
  const { itemsByCategory, selectedItem } = useSelector(state => state.items);
  
  const currentItems = itemsByCategory[filters.category] || [];

  const handleCategoryChange = (category) => {
    dispatch(updateFilter({ key: 'category', value: category }));
  };

  const handleItemSelect = (item) => {
    dispatch(setSelectedItem(item));
    dispatch(updateForm({ field: 'category', value: filters.category }));
    dispatch(updateForm({ field: 'item', value: item.id.toString() }));
  };

  const filteredItems = currentItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(filters.searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || 
                         (filters.status === 'low-stock' && item.currentStock <= item.minStock) ||
                         item.status.toLowerCase() === filters.status;
    return matchesSearch && matchesStatus;
  });

  // SearchInput Component
  const SearchInput = ({ value, onChange, placeholder }) => (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );

  // CategoryTabs Component
  const CategoryTabs = ({ categories, activeCategory, onCategoryChange, itemCounts }) => (
    <div className="border-b border-gray-200">
      <nav className="flex overflow-x-auto">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`flex-shrink-0 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeCategory === category
                ? 'border-blue-500 text-blue-600 bg-blue-50'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {category}
            <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
              {itemCounts[category]?.length || 0}
            </span>
          </button>
        ))}
      </nav>
    </div>
  );

  // ItemCard Component
  const ItemCard = ({ item, isSelected, onClick }) => (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
        isSelected || form.item === item.id.toString()
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
  );

  // EmptyState Component
  const EmptyState = () => (
    <div className="text-center py-8">
      <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
      <p className="text-gray-500">No items found in this category</p>
    </div>
  );

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">📦 Step 1: Select Item by Category</h2>
        <p className="text-sm text-gray-600">Choose category and item for stock out</p>
      </div>
      
      <CategoryTabs 
        categories={CATEGORIES}
        activeCategory={filters.category}
        onCategoryChange={handleCategoryChange}
        itemCounts={itemsByCategory}
      />

      <div className="p-4 border-b border-gray-200">
        <SearchInput 
          value={filters.searchTerm}
          onChange={(value) => dispatch(updateFilter({ key: 'searchTerm', value }))}
          placeholder={`Search items in ${filters.category}...`}
        />
      </div>

      <div className="p-4">
        {filteredItems.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
            {filteredItems.map((item) => (
              <ItemCard 
                key={item.id}
                item={item}
                isSelected={selectedItem?.id === item.id}
                onClick={() => handleItemSelect(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemSelection;