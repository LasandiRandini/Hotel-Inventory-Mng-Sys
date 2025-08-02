
import React from 'react';
import { Filter, Download, Upload, RefreshCw } from 'lucide-react';

const PageHeader = ({ 
  title, 
  description, 
  showFilters = false,
  onToggleFilters,
  showExport = true,
  showBulkImport = false,
  showRefresh = false,
  onExport,
  onBulkImport,
  onRefresh,
  customActions = []
}) => {
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="text-gray-600 mt-1">{description}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-3">
        {/* Advanced Filters Button */}
        {showFilters && onToggleFilters && (
          <button 
            onClick={onToggleFilters}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Filter className="h-4 w-4" />
            <span>Advanced Filters</span>
          </button>
        )}

        {/* Export Button */}
        {showExport && (
          <button 
            onClick={onExport}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
        )}

        {/* Bulk Import Button */}
        {showBulkImport && (
          <button 
            onClick={onBulkImport}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Upload className="h-4 w-4" />
            <span>Bulk Import</span>
          </button>
        )}

        {/* Refresh Button */}
        {showRefresh && (
          <button 
            onClick={onRefresh}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Refresh</span>
          </button>
        )}

        {/* Custom Actions */}
        {customActions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={action.className || "px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"}
          >
            {action.icon && <action.icon className="h-4 w-4" />}
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PageHeader;