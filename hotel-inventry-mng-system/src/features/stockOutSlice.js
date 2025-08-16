// features/stockOutSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { MOCK_STOCK_OUT_ENTRIES, MOCK_BATCHES } from '../data/mockData';

const stockOutSlice = createSlice({
  name: 'stockOut',
  initialState: {
    entries: MOCK_STOCK_OUT_ENTRIES,
    batches: MOCK_BATCHES,
    selectedBatches: {},
    stats: {
      todayValue: 1100, // Today's stock out expense
      entriesCount: 2,  // Today's entries
      totalDepartments: 7,
      activeItems: 18
    },
    filters: {
      category: 'Food',
      dateFilter: new Date().toISOString().split('T')[0],
      searchTerm: '',
      status: 'all',
      showFilters: false
    },
    form: {
      item: '',
      category: '',
      totalQuantity: '',
      department: 'Kitchen',
      outDate: new Date().toISOString().split('T')[0],
      reason: '',
      remarks: ''
    },
    ui: {
      showConfirmation: false,
      autoFillFIFO: true
    },
    loading: false,
    error: null
  },
  reducers: {
    updateFilter: (state, action) => {
      const { key, value } = action.payload;
      state.filters[key] = value;
    },
    updateForm: (state, action) => {
      const { field, value } = action.payload;
      state.form[field] = value;
      
      // Reset batches when item changes
      if (field === 'item' || field === 'category') {
        state.selectedBatches = {};
      }
    },
    updateSelectedBatches: (state, action) => {
      state.selectedBatches = action.payload;
    },
    updateBatchQuantity: (state, action) => {
      const { batchId, quantity } = action.payload;
      const newQuantity = Math.max(0, parseFloat(quantity) || 0);
      
      if (newQuantity > 0) {
        state.selectedBatches[batchId] = newQuantity;
      } else {
        delete state.selectedBatches[batchId];
      }
    },
    toggleAutoFIFO: (state) => {
      state.ui.autoFillFIFO = !state.ui.autoFillFIFO;
    },
    setAutoFIFO: (state, action) => {
      state.ui.autoFillFIFO = action.payload;
    },
    setShowConfirmation: (state, action) => {
      state.ui.showConfirmation = action.payload;
    },
    resetForm: (state) => {
      state.form = {
        item: '',
        category: '',
        totalQuantity: '',
        department: 'Kitchen',
        outDate: new Date().toISOString().split('T')[0],
        reason: '',
        remarks: ''
      };
      state.selectedBatches = {};
    },
    addStockOutEntry: (state, action) => {
      const newEntries = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.entries.unshift(...newEntries);
      
      // Update stats
      const today = new Date().toISOString().split('T')[0];
      const todayEntries = newEntries.filter(entry => entry.date === today);
      if (todayEntries.length > 0) {
        state.stats.entriesCount += todayEntries.length;
        state.stats.todayValue += todayEntries.reduce((sum, entry) => sum + entry.expense, 0);
      }
    },
    // FIFO auto-fill logic
    autoFillBatches: (state) => {
      const { totalQuantity, item } = state.form;
      const { autoFillFIFO } = state.ui;
      
      if (autoFillFIFO && totalQuantity && item) {
        const batches = state.batches[parseInt(item)] || [];
        
        if (batches.length > 0) {
          const sortedBatches = [...batches].sort((a, b) => new Date(a.stockedDate) - new Date(b.stockedDate));
          let remaining = parseFloat(totalQuantity) || 0;
          const newSelection = {};
          
          for (const batch of sortedBatches) {
            if (remaining <= 0) break;
            const takeQty = Math.min(remaining, batch.availableQty);
            if (takeQty > 0) {
              newSelection[batch.id] = takeQty;
              remaining -= takeQty;
            }
          }
          
          state.selectedBatches = newSelection;
        }
      }
    }
  }
});

export const {
  updateFilter,
  updateForm,
  updateSelectedBatches,
  updateBatchQuantity,
  toggleAutoFIFO,
  setAutoFIFO,
  setShowConfirmation,
  resetForm,
  addStockOutEntry,
  autoFillBatches
} = stockOutSlice.actions;

export default stockOutSlice.reducer;