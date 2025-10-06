import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { transactionApi } from "../api";

const initialState = {
  transactionList: {}, // changed to object keyed by studentId
  transactionDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Post Transaction
export const postTransactionAsync = createAsyncThunk(
  "transaction/postTransaction",
  async ({ studentId, data }, { rejectWithValue }) => {
    try {
      const response = await transactionApi.postTransaction(studentId, data);
      return { studentId, transaction: response.data };
    } catch (error) {
      return rejectWithValue("Failed to add transaction");
    }
  }
);

// Get Student Transactions
export const getStudentTransactionsAsync = createAsyncThunk(
  "transaction/getStudentTransactions",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getTransactions(studentId);
      return { studentId, transactions: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions for student");
    }
  }
);

// Get Student Transactions By Id
export const getTransactionsByIdAsync = createAsyncThunk(
  "transaction/getTransactionsById",
  async ({ studentId, transactionId }, { rejectWithValue }) => {
    try {
      const response = await transactionApi.getTransactions(
        studentId,
        transactionId
      );
      return { studentId, transactions: response.data };
    } catch (error) {
      return rejectWithValue("Failed to fetch transactions for transaction Id");
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
        const { studentId, transaction } = action.payload;
        if (!state.transactionList[studentId]) {
          state.transactionList[studentId] = [];
        }
        state.transactionList[studentId].push(transaction);
      })
      .addCase(postTransactionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Student Transactions
      .addCase(getStudentTransactionsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudentTransactionsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { studentId, transactions } = action.payload;
        state.transactionList[studentId] = transactions;
      })
      .addCase(getStudentTransactionsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Transaction By Id
      .addCase(getTransactionsByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getTransactionsByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const { studentId, transaction } = action.payload;
        if (!state.transactionList[studentId]) {
          state.transactionList[studentId] = [];
        }
        const index = state.transactionList[studentId].findIndex(
          (t) => t.id === transaction.id
        );
        if (index >= 0) {
          state.transactionList[studentId][index] = transaction;
        } else {
          state.transactionList[studentId].push(transaction);
        }
      })
      .addCase(getTransactionsByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectTransaction = (state) => state.transaction;
export const { resetTransactionSlice } = transactionSlice.actions;
export default transactionSlice.reducer;
