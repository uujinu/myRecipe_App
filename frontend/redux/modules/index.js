import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./user";
import loginReducer from "./login";
import signupReducer from "./signup";
import storage from "redux-persist/lib/storage";
import storageSession from 'redux-persist/lib/storage/session';
import { persistReducer } from "redux-persist";

export const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["login"],
};

const loginPersistConfig = {
  key: "login",
  storage: storageSession,
}

const combinedReducers = combineReducers({
  login: persistReducer(loginPersistConfig, loginReducer),
  user: userReducer,
  signup: signupReducer,
});

export default combinedReducers;
