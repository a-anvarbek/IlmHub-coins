import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { studentApi } from "../api";

const initialState = {
  studentList: [],
  studentDetail: null,
  status: "idle",
  error: null,
};

// ===== THUNKS =====

// Post Item
export const postStudentAsync = createAsyncThunk(
  "students/postStudent",
  async (data, { rejectWithValue }) => {
    try {
      const response = await studentApi.postStudent(data);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create student");
    }
  }
);

// Get Student
export const getStudentAsync = createAsyncThunk(
  "students/getStudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await studentApi.getStudent();
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch student list");
    }
  }
);

// Get Student By Name Or Surname
export const getStudentByNameOrSurNameAsync = createAsyncThunk(
  "students/getStudentByNameOrSurname",
  async (nameOrSurname, { rejectWithValue }) => {
    try {
      const response = await studentApi.getStudentById(nameOrSurname);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch student by name or surname");
    }
  }
);

// Get Student By Id
export const getStudentByIdAsync = createAsyncThunk(
  "students/getStudentById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await studentApi.getStudentById(id);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch student by Id");
    }
  }
);

// Delete Student
export const deleteStudentAsync = createAsyncThunk(
  "students/deleteStudent",
  async (id, { rejectWithValue }) => {
    try {
      await studentApi.deleteStudent(id);
      return id;
    } catch (error) {
      return rejectWithValue("Failed to delete student");
    }
  }
);

// Get Student By Code
export const getStudentByCodeAsync = createAsyncThunk(
  "students/getStudentByCode",
  async (code, { rejectWithValue }) => {
    try {
      const response = await studentApi.getStudentByCode(code);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch student by code");
    }
  }
);

// Post Student By Id and Group Id
export const postStudentByIdAndGroupIdAsync = createAsyncThunk(
  "students/postStudentByIdAndGroupId",
  async ({ data, id, groupId }, { rejectWithValue }) => {
    try {
      const response = await studentApi.postStudentByIdAndGroupId(
        data,
        id,
        groupId
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to add student to group");
    }
  }
);

// ===== SLICE =====
const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudentSlice: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Post Student
      .addCase(postStudentAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentList.push(action.payload);
      })
      .addCase(postStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Student
      .addCase(getStudentAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentList = action.payload;
      })
      .addCase(getStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Student By Name Or Surname
      .addCase(getStudentByNameOrSurNameAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudentByNameOrSurNameAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentDetail = action.payload;
      })
      .addCase(getStudentByNameOrSurNameAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Student By Id
      .addCase(getStudentByIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudentByIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentDetail = action.payload;
      })
      .addCase(getStudentByIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Delete Student
      .addCase(deleteStudentAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(deleteStudentAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentList = state.studentList.filter(
          (student) => student.id !== action.payload
        );
      })
      .addCase(deleteStudentAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Get Student By Code
      .addCase(getStudentByCodeAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getStudentByCodeAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentDetail = action.payload;
      })
      .addCase(getStudentByCodeAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Post Student By Id And Group Id
      .addCase(postStudentByIdAndGroupIdAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(postStudentByIdAndGroupIdAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.studentList) {
          state.studentList.push(action.payload);
        }
      })
      .addCase(postStudentByIdAndGroupIdAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const selectStudent = (state) => state.student;
export const { resetStudentSlice } = studentSlice.actions;
export default studentSlice.reducer;
