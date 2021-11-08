/* eslint-disable object-shorthand */
import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer } from "redux-persist";
import userReducer from "./user";
import loginReducer from "./login";
import signupReducer from "./signup";

export const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["login"],
};

const loginPersistConfig = {
  key: "login",
  storage: storageSession,
};

const combinedReducers = combineReducers({
  login: persistReducer(loginPersistConfig, loginReducer),
  user: userReducer,
  signup: signupReducer,
});

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }
  return combinedReducers(state, action);
};

export default rootReducer;
