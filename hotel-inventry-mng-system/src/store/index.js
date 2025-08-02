// store/index.js
import { configureStore } from '@reduxjs/toolkit';
import stockInReducer from '../features/stockInSlice';
import itemsReducer from '../features/itemsSlice';

export const store = configureStore({
  reducer: {
    stockIn: stockInReducer,
    items: itemsReducer,
  },
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;