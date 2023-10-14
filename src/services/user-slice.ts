import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {login, logout, register} from "./actions";

type User = {
  email: string;
  name: string;
}

type InitialState = {
	user: User | null;
	isAuthChecked: boolean;
}

const initialState: InitialState = {
  user: null,
  isAuthChecked: false,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(register.fulfilled, (state, action: PayloadAction<User>) => {
          state.user = action.payload;
          state.isAuthChecked = true;
        })
        .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
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