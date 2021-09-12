/* eslint-disable import/extensions */
import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "../modules";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"

const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const makeStore = () => createStore(rootReducer, enhancer);
export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });
