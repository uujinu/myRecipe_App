import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    nickname: "",
    pk: null,
    profile_image: null
  },
  isLoading: false,
  error: "",
  status: ""
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userProfile: (state) => {
      return state.user;
    },
    getUserInfo: (state, { payload }) => {
      state.user = payload.user;
    },
    userLogout: (state) => {
      state.user = initialState.user;
    },
  }
});

const { reducer, actions } = userSlice;
export const { userProfile, getUserInfo, userLogout } = actions;
export const selectUser = (state) => state.user;
export default reducer;
