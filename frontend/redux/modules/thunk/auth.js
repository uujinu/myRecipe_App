import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
const loginUrl = "accounts/login/";
const signupUrl = "accounts/signup/";

// 로그인
export const loginUser = createAsyncThunk(
  "login/loginUSer",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(loginUrl, data, { withCredentials: true });
      axios.defaults.headers.common.Authorization = `Bearer ${res.data.access_token}`;
      return res.data;
    } catch (e) {
      const res = await e.response.data;
      return thunkAPI.rejectWithValue(res);
    }
  },
);

// 회원가입
export const signupUser = createAsyncThunk(
  "signup/signupUser",
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(signupUrl, data);
      return res.data;
    } catch (e) {
      const res = await e.response.data;
      return thunkAPI.rejectWithValue(res);
    }
  },
);
