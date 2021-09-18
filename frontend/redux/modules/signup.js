import { createSlice } from "@reduxjs/toolkit";
import { signupUser } from "./thunk/auth";


const initialState = {
  isLoading: false,
  status: "",
  error: "",
}

const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signupUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [signupUser.fulfilled.type]: (state) => {
      state.isLoading = false;
      state.status= "success";
      state.error = "";
    },
    [signupUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.status= "error"
      state.error = action.error.message;
    },
  }
});

const { reducer, actions } = signupSlice;
export const selectSignup = (state) => state.signup;
export default reducer;
