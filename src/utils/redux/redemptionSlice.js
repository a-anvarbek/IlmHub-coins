import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { redemptionApi } from "../api";

const initialState = {
  redemptionList: [],
  redemptionDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Post Redemption
export const postRedemptionAsync = createAsyncThunk(
  "redemption/postRedemption",
  async ({ data }, { rejectWithValue }) => {
    try {
      const response = await redemptionApi.postRedemption(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add user");
    }
  }
);

// Get Redemption
export const getRedemptionAsync = createAsyncThunk(
  "redemption/getRedemption",
  async (_, { rejectWithValue }) => {
    try {
      const response = await redemptionApi.getRedemption();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch all redemption list");
    }
  }
);

// Get Redemption Id
export const getRedemptionByStudentIdAsync = createAsyncThunk(
  "redemption/getRedemptionByStudentId",
  async (id, { rejectWithValue }) => {
    try {
      const response = await redemptionApi.getRedemptionByStudentId(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        "Failed to fetch all redemption by student ID list"
      );
    }
  }
);

// Put Redemption
export const putRedemptionAsync = createAsyncThunk(
  "redemption/putRedemption",
  async ({ redemptionId, data }, { rejectWithValue }) => {
    try {
      const response = await redemptionApi.putRedemption(redemptionId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update redemption");
    }
  }
);

// ===== SLICE =====
const redemptionSlice = createSlice({
  name: "redemption",
  initialState,
  reducers: {
    resetRedemptionSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Post Redemption
      .addCase(postRedemptionAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postRedemptionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (Array.isArray(state.redemptionList)) {
          state.redemptionList.push(action.payload);
        } else {
          state.redemptionList = [action.payload];
        }
      })
      .addCase(postRedemptionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Redemption
      .addCase(getRedemptionAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRedemptionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.redemptionList = action.payload;
      })
      .addCase(getRedemptionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Redemption By Student Id
      .addCase(getRedemptionByStudentIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getRedemptionByStudentIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.redemptionDetail = action.payload;
      })
      .addCase(getRedemptionByStudentIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Put Redemption
      .addCase(putRedemptionAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(putRedemptionAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedRedemption = action.payload;
        if (Array.isArray(state.redemptionList)) {
          const index = state.redemptionList.findIndex(
            (redemption) => redemption.id === updatedRedemption.id
          );
          if (index !== -1) {
            state.redemptionList[index] = updatedRedemption;
          }
        }
      })
      .addCase(putRedemptionAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectRedemption = (state) => state.redemption;
export const { resetRedemptionSlice } = redemptionSlice.actions;
export default redemptionSlice.reducer;
