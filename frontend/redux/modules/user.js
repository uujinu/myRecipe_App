import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "",
    nickname: "",
    id: null,
    profile_image: null
  }
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userProfile: (state) => {
      return state.user;
    },
    getUserInfo: (state) => {
      state.user = payload.user;
    },
    userLogout: (state) => {
      state.user = initialState.user;
    },
  },
});

const { reducer, actions } = userSlice;
export const { userProfile, getUserInfo, userLogout } = actions;
export const selectUser = (state) => state.user;
export default reducer;
