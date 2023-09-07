import { createSlice } from '@reduxjs/toolkit';
import {login, logout, register} from "./actions";

const initialState = {
  user: null,
  isAuthChecked: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(register.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        })
        .addCase(login.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        })
        .addCase(logout.fulfilled, (state) => {
          state.user = null;
        })
  }
});
  
  export const { setAuthChecked, setUser } = userSlice.actions;
  
  export default userSlice.reducer;