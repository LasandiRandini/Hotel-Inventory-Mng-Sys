import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../services/authService';
// import { ROLES } from '../utils/roles';

const userFromStorage = JSON.parse(localStorage.getItem('user'));

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
   const user = await authService.login(email, password);
    return user;
  }
);

export const logout = createAsyncThunk('auth/logout', async () => {
 await authService.logout();
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: userFromStorage || null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = 'succeeded';
        state.user = payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  }
});

export default authSlice.reducer;
