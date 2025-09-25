import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transactionApi } from "../api";

const initialState = {
  transactionList: [],
  transactionDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Post Transaction
export const postTransactionAsync = createAsyncThunk(
  "transaction/postTransaction",
  async ({ data, id }, { rejectWithValue }) => {
    try {
      const response = await transactionApi.postTransaction(data, id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add transaction");
    }
  }
);

// Get Transaction By Id
export const getTransactionAsync = createAsyncThunk(
  "transaction/getTransaction",
  async (id, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getTransaction(id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch transaction by Id");
    }
  }
);

// ===== SLICE =====
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    resetTransactionSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Post Transaction
      .addCase(postTransactionAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postTransactionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.transactionList) {
          state.transactionList.push(action.payload);
        }
      })
      .addCase(postTransactionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Transaction
      .addCase(getTransactionAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTransactionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionDetail = action.payload;
      })
      .addCase(getTransactionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectTransaction = (state) => state.transaction;
export const { resetTransactionSlice } = transactionSlice.actions;
export default transactionSlice.reducer;
