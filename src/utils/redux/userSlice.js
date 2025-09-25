import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../api";

const initialState = {
  userList: [],
  userDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Get Teacher
export const getTeacherAsync = createAsyncThunk(
  "users/getTeacher",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getTeacher();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch teacher list");
    }
  }
);

// Get User
export const getUserAsync = createAsyncThunk(
  "users/getUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getUser();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user list");
    }
  }
);

// Get User By Email
export const getUserByEmailAsync = createAsyncThunk(
  "users/getUserByEmail",
  async (email, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserByEmail(email);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch users by Email");
    }
  }
);

// Get User By Id
export const getUserByIdAsync = createAsyncThunk(
  "users/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await userApi.getUserById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch users by Id");
    }
  }
);

// Post User
export const postUserAsync = createAsyncThunk(
  "users/postUser",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await userApi.postUser(data, id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add user");
    }
  }
);

// Delete User
export const deleteUserAsync = createAsyncThunk(
  "users/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      await userApi.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete user");
    }
  }
);

// ===== SLICE =====
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Teacher
      .addCase(getTeacherAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTeacherAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload;
      })
      .addCase(getTeacherAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get User
      .addCase(getUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = action.payload;
      })
      .addCase(getUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get User By Email
      .addCase(getUserByEmailAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserByEmailAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetail = action.payload;
      })
      .addCase(getUserByEmailAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get User By Id
      .addCase(getUserByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetail = action.payload;
      })
      .addCase(getUserByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Post User
      .addCase(postUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.userList) {
          state.userList.push(action.payload);
        }
      })
      .addCase(postUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete User
      .addCase(deleteUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userList = state.userList.filter(
          (user) => user.id !== action.payload
        );
      })
      .addCase(deleteUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectUser = (state) => state.user;
export const { resetUserSlice } = userSlice.actions;
export default userSlice.reducer;
