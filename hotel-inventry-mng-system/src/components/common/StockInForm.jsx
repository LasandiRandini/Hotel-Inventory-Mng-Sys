
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, resetForm, addStockEntry } from '../../features/stockInSlice';
import Button from '../common/Button';

const StockInForm = () => {
  const dispatch = useDispatch();
  const { form, loading } = useSelector(state => state.stockIn);
  const { selectedItem } = useSelector(state => state.items);

  const handleFormChange = (field, value) => {
    dispatch(updateForm({ field, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedItem) return;

    // const entryData = {
    //   ...form,
    //   itemId: selectedItem.id,
    //   itemName: selectedItem.name,
    //   unit: selectedItem.unit,
    //   totalValue: parseFloat(form.quantity) * parseFloat(form.unitPrice)
    // };
     const newEntry = {
      id: Date.now(), // Simple ID generation for demo
      date: form.stockedDate,
      item: selectedItem.name,
      category: form.category,
      qty: parseFloat(form.quantity),
      unit: selectedItem.unit,
      unitPrice: parseFloat(form.unitPrice),
      totalValue: parseFloat(form.quantity) * parseFloat(form.unitPrice),
      batchId: `BATCH-${form.stockedDate.replace(/-/g, '')}${String(Date.now()).slice(-3)}`,
      expiry: form.expiryDate,
      supplier: form.supplier,
      remarks: form.remarks,
      status: 'Active'
    };
 // Add to stock entries
    dispatch(addStockEntry(newEntry));
    
    // Update item stock
    dispatch(updateItemStock({
      itemId: selectedItem.id,
      quantity: parseFloat(form.quantity),
      category: form.category
    }));
     // Reset form
    dispatch(resetForm());
    
    alert(`Stock added successfully! Batch ID: ${newEntry.batchId}`);
  };
//     dispatch(addStockInEntry(entryData))
//       .unwrap()
//       .then(() => {
//         dispatch(resetForm());
//         alert('Stock added successfully!');
//       })
//       .catch((error) => {
//         alert('Error adding stock: ' + error.message);
//       });
//   };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Stock Entry Form</h2>
        <p className="text-sm text-gray-600 mt-1">Create new batch entry</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selected Item Display */}
        {selectedItem && (
          <div className="bg-gray-50 rounded-lg p-4 border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{selectedItem.name}</h3>
                <p className="text-sm text-gray-600">{form.category} • {selectedItem.unit}</p>
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

        {/* Form Fields */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantity <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={form.quantity}
            onChange={(e) => handleFormChange('quantity', e.target.value)}
            placeholder={selectedItem ? `Enter quantity in ${selectedItem.unit}` : "Select item first"}
            min="0.01"
            step="0.01"
            disabled={!selectedItem}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Unit Price (₹) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={form.unitPrice}
            onChange={(e) => handleFormChange('unitPrice', e.target.value)}
            placeholder="0.00"
            min="0"
            step="0.01"
            disabled={!selectedItem}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            required
          />
        </div>

        {/* Other form fields... */}

        <div className="pt-4">
          <Button
            type="submit"
            variant="primary"
            disabled={!selectedItem || loading}
            loading={loading}
            className="w-full"
          >
            Add Stock Entry
          </Button>
        </div>
      </form>
    </div>
  );
};

export default StockInForm;