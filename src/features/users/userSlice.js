import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  token: localStorage.getItem("token") || null, // Retrieve token from localStorage
  loading: "idle",
  error: null,
};
const loginUser = async (user) => {
  const response = await axios.post("http://localhost:3000/login", user);
  return response.data;
};
const logoutUser = async (user) => {
  const response = await axios.post("http://localhost:3000/logout", user);
  return response.data;
};

export const LoginUserAsync = createAsyncThunk(
  "authentication/loginUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await loginUser(user);
      //   document.cookie = `authToken=${response.token}`;
      localStorage.setItem("token", response.token);

      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logoutUserAsync = createAsyncThunk(
  "authentication/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUser();
      localStorage.removeItem("token"); // Remove the token from localStorage
      return null;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    // Additional synchronous reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.user = action.payload;
      state.token = localStorage.getItem("token"); // Update the token in the state
      state.loading = "idle";
      state.error = null;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = "idle";
      state.error = action.payload;
    });
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.user = null;
      state.token = null;
    });
  },
});

export const getUser = (state) => state.authentication.user;

export const { user } = authenticationSlice.actions;

export default authenticationSlice.reducer;
