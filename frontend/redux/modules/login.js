import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessJWT: "",
  isLoading: false,
  isAuth: false,
  error: "",
}

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    loginPending: (state) => {
      state.isLoading = true;
    },
    loginSuccess: (state, { payload }) => {
      state.accessJWT = payload.access_token;
      state.isLoading = false;
      state.isAuth = true;
      state.error = "";
    },
    loginFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    }
  }
});

const { reducer, actions } = loginSlice;
export const { loginPending, loginSuccess, loginFail } = actions;
export const selectLogin = (state) => state.login;
export default reducer;
