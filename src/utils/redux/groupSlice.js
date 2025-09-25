import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { groupApi } from "../api";

const initialState = {
  groupList: [],
  groupDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Get Group All
export const getGroupAllAsync = createAsyncThunk(
  "group/getGroupAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await groupApi.getGroupAll();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch all groups list");
    }
  }
);

// Get Group By Id
export const getGroupByIdAsync = createAsyncThunk(
  "group/getGroupById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await groupApi.getGroupById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch group by ID");
    }
  }
);

// Get Group By Name
export const getGroupByNameAsync = createAsyncThunk(
  "group/getGroupByName",
  async (name, { rejectWithValue }) => {
    try {
      const response = await groupApi.getGroupByName(name);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch group by name");
    }
  }
);

// Post Group
export const postGroupAsync = createAsyncThunk(
  "group/postGroup",
  async (data, { rejectWithValue }) => {
    try {
      const response = await groupApi.postGroup(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create group");
    }
  }
);

// Put Group
export const putGroupAsync = createAsyncThunk(
  "group/putGroup",
  async ({ groupId, data }, { rejectWithValue }) => {
    try {
      const response = await groupApi.putGroup(groupId, data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to update group");
    }
  }
);

// ===== SLICE =====
const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    resetGroupSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get Group All
      .addCase(getGroupAllAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getGroupAllAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupList = action.payload;
      })
      .addCase(getGroupAllAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Group By Id
      .addCase(getGroupByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getGroupByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupDetail = action.payload;
      })
      .addCase(getGroupByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Group By Name
      .addCase(getGroupByNameAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getGroupByNameAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupDetail = action.payload;
      })
      .addCase(getGroupByNameAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Post Group
      .addCase(postGroupAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postGroupAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupList.push(action.payload);
      })
      .addCase(postGroupAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Put Group (change teacher)
      .addCase(putGroupAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(putGroupAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedGroup = action.payload;
        const index = state.groupList.findIndex(
          (group) => group.id === updatedGroup.id
        );
        if (index !== -1) {
          state.groupList[index] = updatedGroup;
        }
      })
      .addCase(putGroupAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectGroup = (state) => state.group;
export const { resetGroupSlice } = groupSlice.actions;
export default groupSlice.reducer;
