// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import stockInReducer from '../features/stockInSlice';
import stockOutReducer from '../features/stockOutSlice';
import itemsReducer from '../features/itemsSlice';

export const store = configureStore({
  reducer: {
    stockIn: stockInReducer,
    stockOut: stockOutReducer, // Assuming stockOut uses the same reducer for simplicity
    items: itemsReducer,
  },
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;