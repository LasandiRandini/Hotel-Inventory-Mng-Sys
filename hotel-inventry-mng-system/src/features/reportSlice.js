
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import reportService from '../../services/reportService';

export const fetchUsageTrends = createAsyncThunk(
  'report/fetchUsageTrends',
  async () => await reportService.getUsageTrends()
);

export const fetchExpiryAlerts = createAsyncThunk(
  'report/fetchExpiryAlerts',
  async () => await reportService.getExpiryAlerts()
);

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    usageTrends: [],
    expiryAlerts: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUsageTrends.pending, state => { state.status = 'loading' })
      .addCase(fetchUsageTrends.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.usageTrends = payload;
      })
      .addCase(fetchUsageTrends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchExpiryAlerts.fulfilled, (state, { payload }) => {
        state.expiryAlerts = payload;
      });
  }
});

export default reportSlice.reducer;
