import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api";

const initialState = {
  authList: [],
  authDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Register
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create register");
    }
  }
);

// Login
export const loginAsync = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.login(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create login");
    }
  }
);

// Get Confirmation
export const getConfirmationAsync = createAsyncThunk(
  "auth/getConfirmation",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getConfirmation();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch confirmation");
    }
  }
);

// Resend Confirmation
export const resendConfirmationAsync = createAsyncThunk(
  "auth/resendConfirmation",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.resendConfirmation(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create resend confirmation");
    }
  }
);

// Forgot Password
export const forgotPasswordAsync = createAsyncThunk(
  "auth/forgotPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.forgotPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create forgot password");
    }
  }
);

// Reset Password
export const resetPasswordAsync = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.resetPassword(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create reset password");
    }
  }
);

// ===== SLICE =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authList.push(action.payload);
      })
      .addCase(registerAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Login
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authList.push(action.payload);
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Confirmation
      .addCase(getConfirmationAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getConfirmationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authList = action.payload;
      })
      .addCase(getConfirmationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Resend Confirmation
      .addCase(resendConfirmationAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resendConfirmationAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authList.push(action.payload);
      })
      .addCase(resendConfirmationAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authList.push(action.payload);
      })
      .addCase(forgotPasswordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Reset Password
      .addCase(resetPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.authList.push(action.payload);
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;
export const { resetAuthSlice } = authSlice.actions;
export default authSlice.reducer;
