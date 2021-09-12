import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const name = "login";
axios.defaults.baseURL = "http://localhost:8000";
const loginUrl = "accounts/login/";
const signupUrl = "accounts/signup/";
const logoutUrl = "accounts/logout/";

// 로그인
export const loginUser = createAsyncThunk(
  `${name}/loginUSer`,
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(loginUrl, data, {withCredentials: true});
      axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.access_token}`;
      return res.data;
    } catch (e) {
        const res = await e.response.data;
        return thunkAPI.rejectWithValue(res);
    }
  }
)

// 회원가입
export const signupUser = createAsyncThunk(
  `${name}/signupUser`,
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(signupUrl, data);
      return res.data;
    } catch (e) {
        const res = await e.response.data;
        return thunkAPI.rejectWithValue(res)
    }
  }
)

// 로그아웃
export const logoutUser = createAsyncThunk(
  `${name}/logoutUser`,
  async (data, thunkAPI) => {
    try {
      const res = await axios.post(logoutUrl, data);
      return res.data;
    } catch (e) {
        const res = await e.response.data;
        return thunkAPI.rejectWithValue(res)
    }
  }
)
