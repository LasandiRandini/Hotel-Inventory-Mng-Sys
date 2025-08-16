
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";

const userFromStorage = (() => {
  try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
})();

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await authService.login({ username, password });
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || "Login failed";
      return rejectWithValue(msg);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: userFromStorage || null, // { username, role }
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.status = "succeeded";
        state.user = { username: payload.username, role: payload.role };
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
