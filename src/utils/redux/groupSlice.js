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
      console.log("DEBUG: creating group with data =>", data);
      const response = await groupApi.postGroup({
        name: data.name,
        description: data.description,
        teacherId: data.teacherId,
      });
      return response.data;
    } catch (error) {
      console.error(
        "DEBUG: postGroupAsync error =>",
        error.response?.data || error.message
      );
      return rejectWithValue(
        error.response?.data?.message || "Failed to create group"
      );
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

// Get My Groups
export const getMyGroupsAsync = createAsyncThunk(
  "group/getMyGroups",
  async (_, { rejectWithValue }) => {
    try {
      const response = await groupApi.getMyGroups();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch my groups");
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
        if (Array.isArray(state.groupList)) {
          state.groupList.push(action.payload);
        } else {
          state.groupList = [action.payload];
        }
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
        if (Array.isArray(state.groupList)) {
          const index = state.groupList.findIndex(
            (group) => group.id === updatedGroup.id
          );
          if (index !== -1) {
            state.groupList[index] = updatedGroup;
          }
        }
      })
      .addCase(putGroupAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get My Groups
      .addCase(getMyGroupsAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getMyGroupsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.groupList = action.payload;
      })
      .addCase(getMyGroupsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectGroup = (state) => state.group;
export const { resetGroupSlice } = groupSlice.actions;
export default groupSlice.reducer;
