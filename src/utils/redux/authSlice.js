import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api";
import { jwtDecode } from "jwt-decode";

// === Initial State ===
const initialState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  role:
    typeof window !== "undefined" && localStorage.getItem("role")
      ? Number(localStorage.getItem("role"))
      : null,
  status: "idle",
  error: null,
  isAuthenticated: false,
  user: null,
};

// === Thunks ===

// Register
export const registerAsync = createAsyncThunk(
  "auth/register",
  async (data, { rejectWithValue }) => {
    try {
      const response = await authApi.register(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to register");
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
      return rejectWithValue("Failed to login");
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
      return rejectWithValue("Failed to request password reset");
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
      return rejectWithValue("Failed to reset password");
    }
  }
);

// Get Me
export const getMeAsync = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.me();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user data");
    }
  }
);

// === Slice ===
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      state.user = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = "succeeded";
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
        const payload = action.payload || {};
        const token = payload.token;
        let role = payload.role;

        if (!role && token) {
          try {
            const decoded = jwtDecode(token);
            role =
              decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ??
              decoded.role ??
              null;
          } catch (err) {
            role = null;
          }
        }

        if (typeof role === "string") {
          const map = { Admin: 0, Teacher: 1, Student: 2 };
          role = map[role] !== undefined ? map[role] : null;
        }

        state.token = token;
        state.role = role !== null ? Number(role) : null;
        state.isAuthenticated = true;

        if (typeof window !== "undefined") {
          if (token) localStorage.setItem("token", token);
          if (role !== null) localStorage.setItem("role", String(role));
        }
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Me
      .addCase(getMeAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Map backend response fields to frontend fields
        const userData = action.payload;
        state.user = {
          ...userData,
          balance: userData.balance ?? 0,
          groups: userData.groups ?? [],
          studentCode: userData.studentCode ?? "",
          teachers: userData.teachers ?? [],
        };
      })
      .addCase(getMeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Forgot Password
      .addCase(forgotPasswordAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(forgotPasswordAsync.fulfilled, (state) => {
        state.status = "succeeded";
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
      .addCase(resetPasswordAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
