import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { rewardItemApi } from "../api";

const initialState = {
  rewardItemList: [],
  rewardItemDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Get Item
export const getItemAsync = createAsyncThunk(
  "rewardItem/getItem",
  async (_, { rejectWithValue }) => {
    try {
      const response = await rewardItemApi.getItem();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch item list");
    }
  }
);

// Post Item
export const postItemAsync = createAsyncThunk(
  "rewardItem/postItem",
  async (data, { rejectWithValue }) => {
    try {
      const response = await rewardItemApi.postItem(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create item");
    }
  }
);

// Get Item By Id
export const getItemByIdAsync = createAsyncThunk(
  "rewardItem/getItemById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await rewardItemApi.getItemById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch item by Id");
    }
  }
);

// Delete Item
export const deleteItemAsync = createAsyncThunk(
  "rewardItem/deleteItem",
  async (id, { rejectWithValue }) => {
    try {
      await rewardItemApi.deleteItem(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete item");
    }
  }
);

// ===== SLICE =====
const rewardItemSlice = createSlice({
  name: "rewardItem",
  initialState,
  reducers: {
    resetRewardItemSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Item
      .addCase(getItemAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rewardItemList = action.payload;
      })
      .addCase(getItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Post Item
      .addCase(postItemAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rewardItemList.push(action.payload);
      })
      .addCase(postItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Item By Id
      .addCase(getItemByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getItemByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rewardItemDetail = action.payload;
      })
      .addCase(getItemByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Item
      .addCase(deleteItemAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteItemAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.rewardItemList = state.rewardItemList.filter(
          (item) => item.id !== action.payload
        );
      })
      .addCase(deleteItemAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectRewardItem = (state) => state.rewardItem;
export const { resetRewardItemSlice } = rewardItemSlice.actions;
export default rewardItemSlice.reducer;
