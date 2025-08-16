
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Check, Clock } from 'lucide-react';
import { 
  updateForm, 
  setShowConfirmation, 
  resetForm, 
  addStockOutEntry 
} from '../../features/stockOutSlice';
import { updateItemStock } from '../../features/itemsSlice';
import { DEPARTMENTS, REASONS } from '../../data/mockData';

const StockOutForm = () => {
  const dispatch = useDispatch();
  const { 
    form, 
    selectedBatches, 
    batches, 
    entries,
    ui: { showConfirmation }
  } = useSelector(state => state.stockOut);
  const { selectedItem } = useSelector(state => state.items);

  // Calculations
  const availableBatches = selectedItem ? batches[selectedItem.id] || [] : [];
  const totalSelectedQty = Object.values(selectedBatches).reduce((sum, qty) => sum + (qty || 0), 0);
  const totalExpense = availableBatches.reduce((sum, batch) => 
    sum + ((selectedBatches[batch.id] || 0) * batch.costPerUnit), 0
  );
  const canProceedToConfirmation = selectedItem && totalSelectedQty > 0 && form.department && form.reason;

  const handleFormChange = (field, value) => {
    dispatch(updateForm({ field, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setShowConfirmation(true));
  };

  const handleConfirmSubmit = () => {
    if (!selectedItem) return;

    const selectedBatchDetails = availableBatches.filter(batch => selectedBatches[batch.id]);
    
    const newEntries = selectedBatchDetails.map((batch, index) => ({
      id: entries.length + index + 1,
      date: form.outDate,
      item: selectedItem.name,
      category: form.category,
      qty: selectedBatches[batch.id],
      unit: selectedItem.unit,
      department: form.department,
      reason: form.reason,
      batchId: batch.id,
      expense: selectedBatches[batch.id] * batch.costPerUnit,
      remarks: form.remarks,
      status: 'Completed'
    }));

    // Add entries to Redux
    dispatch(addStockOutEntry(newEntries));
    
    // Update item stock (reduce current stock)
    const totalQtyUsed = newEntries.reduce((sum, entry) => sum + entry.qty, 0);
    dispatch(updateItemStock({
      itemId: selectedItem.id,
      quantity: -totalQtyUsed, // Negative because it's going out
      category: form.category
    }));

    // Reset form and close confirmation
    dispatch(resetForm());
    dispatch(setShowConfirmation(false));
    
    alert(`Stock out recorded successfully! Total entries: ${newEntries.length}, Total value: ₹${totalExpense.toFixed(2)}`);
  };

  const getFilteredStockEntries = () => {
    return entries.slice(0, 10); // Show recent 10 entries
  };

  return (
    <div className="space-y-6">
      {/* Step 3: Department & Details */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">📝 Step 3: Stock Out Details</h2>
          <p className="text-sm text-gray-600">Complete the stock out information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
            <select
              value={form.department}
              onChange={(e) => handleFormChange('department', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              {DEPARTMENTS.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
            <input
              type="date"
              value={form.outDate}
              onChange={(e) => handleFormChange('outDate', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason/Purpose *</label>
            <select
              value={form.reason}
              onChange={(e) => handleFormChange('reason', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select reason...</option>
              {REASONS.map(reason => (
                <option key={reason} value={reason}>{reason}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Remarks (Optional)</label>
            <textarea
              value={form.remarks}
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
                <p><span className="font-medium">Category:</span> {form.category}</p>
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
            {getFilteredStockEntries().map((entry) => (
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
                    <p className="font-medium">{form.category}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Department:</span>
                    <p className="font-medium">{form.department}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <p className="font-medium">{new Date(form.outDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Reason:</span>
                    <p className="font-medium">{form.reason}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Total Quantity:</span>
                    <p className="font-medium">{totalSelectedQty} {selectedItem?.unit}</p>
                  </div>
                </div>
                {form.remarks && (
                  <div className="mt-3">
                    <span className="text-gray-600 text-sm">Remarks:</span>
                    <p className="font-medium text-sm">{form.remarks}</p>
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
                onClick={() => dispatch(setShowConfirmation(false))}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSubmit}
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
  );
};

export default StockOutForm;