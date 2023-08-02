import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  registerDB,
  loginDB,
  updateUserProfile,
  logOutDB,
} from "../firebase-auth";

export const register = createAsyncThunk(
  "auth/register",
  async ({ credentials, displayName }, thunkAPI) => {
    try {
      const user = await registerDB(credentials);
      await updateUserProfile({ displayName });
      return { email: user.email, displayName, id: user.id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { user, token } = await loginDB(credentials);
      return {
        user: {
          email: user.email,
          displayName: user.displayName,
          id: user.uid,
        },
        token,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    logOutDB();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const operations = {
  register,
  logIn,
  logOut,
};

export default operations;
