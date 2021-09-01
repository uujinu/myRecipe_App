import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import userReducer from "./user";
import loginReducer from "./login";

const combinedReducers = combineReducers({
  user: userReducer,
  login: loginReducer,
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
