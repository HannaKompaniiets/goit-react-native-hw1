import { createSlice } from "@reduxjs/toolkit";
import authOperations from "./auth-operations";

const initialState = {
  user: { displayName: null, email: null },
  token: null,
  isLoggedIn: false,
  isAuthError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(authOperations.register.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isAuthError = false;
      })
      .addCase(authOperations.register.rejected, (state, _action) => {
        state.isAuthError = true;
      })
      .addCase(authOperations.logIn.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isAuthError = false;
      })
      .addCase(authOperations.logIn.rejected, (state, _action) => {
        state.isAuthError = true;
      })
      .addCase(authOperations.logOut.fulfilled, (state, _action) => {
        state.user = { displayName: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
      });
  },
});

export const authReducer = authSlice.reducer;
