import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./thunk/auth";


const initialState = {
  accessJWT: "",
  isLoading: false,
  isAuth: false,
  error: "",
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: {
    [loginUser.pending.type]: (state) => {
      state.isLoading = true;
    },
    [loginUser.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = true;
      state.accessJWT = payload.access_token;
      state.error = "";
    },
    [loginUser.rejected.type]: (state, action) => {
      state.isLoading = false;
      state.isAuth = false;
      state.accessJWT = "";
      state.error = action.error.message;
    },
  }
});

const { reducer, actions } = loginSlice;
export const selectLogin = (state) => state.login;
export default reducer;
