// features/stockInSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MOCK_STOCK_ENTRIES } from '../data/mockData';

// ✅ Add the missing async thunk
export const fetchStockInEntries = createAsyncThunk(
  'stockIn/fetchEntries',
  async (filters = {}, { rejectWithValue }) => {
    try {
      // Simulate API call with mock data
      return new Promise((resolve) => {
        setTimeout(() => {
          let filteredEntries = [...MOCK_STOCK_ENTRIES];
          
          // Apply filters to mock data
          if (filters.dateFilter) {
            filteredEntries = filteredEntries.filter(entry => entry.date === filters.dateFilter);
          }
          
          // Calculate stats
          const today = new Date().toISOString().split('T')[0];
          const todayEntries = MOCK_STOCK_ENTRIES.filter(e => e.date === today);
          
          const stats = {
            todayValue: todayEntries.reduce((sum, e) => sum + e.totalValue, 0),
            entriesCount: todayEntries.length,
            activeBatches: MOCK_STOCK_ENTRIES.filter(e => e.status === 'Active').length,
            totalItems: 18 // You can calculate this from MOCK_ITEMS
          };
          
          resolve({
            entries: filteredEntries,
            stats
          });
        }, 300);
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const stockInSlice = createSlice({
  name: 'stockIn',
  initialState: {
    entries: MOCK_STOCK_ENTRIES,
    stats: {
      todayValue: 5500,
      entriesCount: 2,
      activeBatches: 5,
      totalItems: 18
    },
    filters: {
      category: 'Food',
      dateFilter: new Date().toISOString().split('T')[0],
      searchTerm: '',
      status: 'all'
    },
    form: {
      item: '',
      category: '',
      quantity: '',
      unitPrice: '',
      stockedDate: new Date().toISOString().split('T')[0],
      expiryDate: '',
      supplier: '',
      remarks: ''
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
    },
    resetForm: (state) => {
      state.form = {
        item: '',
        category: '',
        quantity: '',
        unitPrice: '',
        stockedDate: new Date().toISOString().split('T')[0],
        expiryDate: '',
        supplier: '',
        remarks: ''
      };
    },
    addStockEntry: (state, action) => {
      state.entries.unshift(action.payload);
      const today = new Date().toISOString().split('T')[0];
      if (action.payload.date === today) {
        state.stats.entriesCount += 1;
        state.stats.todayValue += action.payload.totalValue;
      }
      state.stats.activeBatches += 1;
    }
  },
  // ✅ Handle async thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchStockInEntries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStockInEntries.fulfilled, (state, action) => {
        state.loading = false;
        state.entries = action.payload.entries;
        state.stats = action.payload.stats;
      })
      .addCase(fetchStockInEntries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch stock entries';
      });
  }
});

export const { updateFilter, updateForm, resetForm, addStockEntry } = stockInSlice.actions;
export default stockInSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import stockInService from '../services/stockInService';

// // Async thunks
// export const fetchStockInEntries = createAsyncThunk(
//   'stockIn/fetchEntries',
//   async (filters, { rejectWithValue }) => {
//     try {
//       return await stockInService.getStockInEntries(filters);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const addStockInEntry = createAsyncThunk(
//   'stockIn/addEntry',
//   async (entryData, { rejectWithValue }) => {
//     try {
//       return await stockInService.createStockInEntry(entryData);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const stockInSlice = createSlice({
//   name: 'stockIn',
//   initialState: {
//     entries: [],
//     stats: {
//       todayValue: 0,
//       entriesCount: 0,
//       activeBatches: 0
//     },
//     filters: {
//       category: 'Food',
//       dateFilter: new Date().toISOString().split('T')[0],
//       searchTerm: '',
//       status: 'all'
//     },
//     form: {
//       item: '',
//       category: '',
//       quantity: '',
//       unitPrice: '',
//       stockedDate: new Date().toISOString().split('T')[0],
//       expiryDate: '',
//       supplier: '',
//       remarks: ''
//     },
//     loading: false,
//     error: null
//   },
//   reducers: {
//     updateFilter: (state, action) => {
//       const { key, value } = action.payload;
//       state.filters[key] = value;
//     },
//     updateForm: (state, action) => {
//       const { field, value } = action.payload;
//       state.form[field] = value;
//     },
//     resetForm: (state) => {
//       state.form = {
//         item: '',
//         category: '',
//         quantity: '',
//         unitPrice: '',
//         stockedDate: new Date().toISOString().split('T')[0],
//         expiryDate: '',
//         supplier: '',
//         remarks: ''
//       };
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStockInEntries.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchStockInEntries.fulfilled, (state, action) => {
//         state.loading = false;
//         state.entries = action.payload.entries;
//         state.stats = action.payload.stats;
//       })
//       .addCase(fetchStockInEntries.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload?.message || 'Failed to fetch entries';
//       })
//       .addCase(addStockInEntry.fulfilled, (state, action) => {
//         state.entries.unshift(action.payload);
//         // Update stats
//         state.stats.entriesCount += 1;
//         state.stats.todayValue += action.payload.totalValue;
//       });
//   }
// });

// export const { updateFilter, updateForm, resetForm, clearError } = stockInSlice.actions;
// export default stockInSlice.reducer;