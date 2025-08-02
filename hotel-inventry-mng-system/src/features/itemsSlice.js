// features/itemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { MOCK_ITEMS } from '../data/mockData';

// ✅ Add the async thunk
export const fetchItemsByCategory = createAsyncThunk(
  'items/fetchByCategory',
  async (category, { rejectWithValue }) => {
    try {
      // For now, return mock data (simulate API call)
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            category,
            items: MOCK_ITEMS[category] || []
          });
        }, 500); // Simulate 500ms API delay
      });
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    itemsByCategory: MOCK_ITEMS,
    selectedItem: null,
    loading: false,
    error: null
  },
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    clearSelectedItem: (state) => {
      state.selectedItem = null;
    },
    addNewItem: (state, action) => {
      const { category, ...item } = action.payload;
      if (state.itemsByCategory[category]) {
        state.itemsByCategory[category].push(item);
      }
    },
    updateItemStock: (state, action) => {
      const { itemId, quantity, category } = action.payload;
      const item = state.itemsByCategory[category]?.find(item => item.id === itemId);
      if (item) {
        item.currentStock += quantity;
      }
    }
  },
  // ✅ Add extraReducers to handle async thunk
  extraReducers: (builder) => {
    builder
      .addCase(fetchItemsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItemsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        const { category, items } = action.payload;
        state.itemsByCategory[category] = items;
      })
      .addCase(fetchItemsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch items';
      });
  }
});

export const { setSelectedItem, clearSelectedItem, addNewItem, updateItemStock } = itemsSlice.actions;
export default itemsSlice.reducer;
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import itemsService from '../services/itemsService';

// export const fetchItemsByCategory = createAsyncThunk(
//   'items/fetchByCategory',
//   async (category, { rejectWithValue }) => {
//     try {
//       return await itemsService.getItemsByCategory(category);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// export const addNewItem = createAsyncThunk(
//   'items/addNew',
//   async (itemData, { rejectWithValue }) => {
//     try {
//       return await itemsService.createItem(itemData);
//     } catch (error) {
//       return rejectWithValue(error.response.data);
//     }
//   }
// );

// const itemsSlice = createSlice({
//   name: 'items',
//   initialState: {
//     itemsByCategory: {},
//     selectedItem: null,
//     loading: false,
//     error: null
//   },
//   reducers: {
//     setSelectedItem: (state, action) => {
//       state.selectedItem = action.payload;
//     },
//     clearSelectedItem: (state) => {
//       state.selectedItem = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchItemsByCategory.fulfilled, (state, action) => {
//         const { category, items } = action.payload;
//         state.itemsByCategory[category] = items;
//       })
//       .addCase(addNewItem.fulfilled, (state, action) => {
//         const { category } = action.payload;
//         if (state.itemsByCategory[category]) {
//           state.itemsByCategory[category].push(action.payload);
//         }
//       });
//   }
// });

// export const { setSelectedItem, clearSelectedItem } = itemsSlice.actions;
// export default itemsSlice.reducer;