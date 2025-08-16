// components/stockOut/BatchSelection.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Eye } from 'lucide-react';
import { updateForm, updateBatchQuantity, setAutoFIFO, autoFillBatches } from '../../features/stockOutSlice';

const BatchSelection = () => {
  const dispatch = useDispatch();
  const { 
    form, 
    selectedBatches, 
    batches, 
    ui: { autoFillFIFO } 
  } = useSelector(state => state.stockOut);
  const { selectedItem } = useSelector(state => state.items);

  const availableBatches = selectedItem ? batches[selectedItem.id] || [] : [];
  const totalSelectedQty = Object.values(selectedBatches).reduce((sum, qty) => sum + (qty || 0), 0);
  const totalExpense = availableBatches.reduce((sum, batch) => 
    sum + ((selectedBatches[batch.id] || 0) * batch.costPerUnit), 0
  );

  // Auto-fill effect
  useEffect(() => {
    if (autoFillFIFO && form.totalQuantity && form.item) {
      dispatch(autoFillBatches());
    }
  }, [autoFillFIFO, form.totalQuantity, form.item, dispatch]);

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

  if (!selectedItem || availableBatches.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200">
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">🔄 Step 2: Batch Selection</h2>
            <p className="text-sm text-gray-600">
              Select batches for <span className="font-medium text-blue-600">{selectedItem.name}</span>
            </p>
          </div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={autoFillFIFO}
              onChange={(e) => dispatch(setAutoFIFO(e.target.checked))}
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
              value={form.totalQuantity}
              onChange={(e) => dispatch(updateForm({ field: 'totalQuantity', value: e.target.value }))}
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
                        onChange={(e) => dispatch(updateBatchQuantity({ 
                          batchId: batch.id, 
                          quantity: e.target.value 
                        }))}
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
  );
};

export default BatchSelection;