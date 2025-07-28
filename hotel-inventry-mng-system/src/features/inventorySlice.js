
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import inventoryService from '../../services/inventoryService';

export const fetchItems = createAsyncThunk(
  'inventory/fetchItems',
  async () => await inventoryService.getAll()
);

export const addItem = createAsyncThunk(
  'inventory/addItem',
  async (itemData) => await inventoryService.addItem(itemData)
);

export const useItem = createAsyncThunk(
  'inventory/useItem',
  async ({ id, quantity }) => await inventoryService.useItem(id, quantity)
);

const inventorySlice = createSlice({
  name: 'inventory',
  initialState: {
    items: [],
    lowStock: [],
    monthlyUsage: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchItems
      .addCase(fetchItems.pending, state => { state.status = 'loading' })
      .addCase(fetchItems.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.items = payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // addItem
      .addCase(addItem.fulfilled, (state, { payload }) => {
        state.items.push(payload);
      })

      // useItem
      .addCase(useItem.fulfilled, (state, { payload }) => {
        // payload returns updated item
        const idx = state.items.findIndex(i => i.id === payload.id);
        if (idx !== -1) state.items[idx] = payload;
      });
  }
});

export default inventorySlice.reducer;
