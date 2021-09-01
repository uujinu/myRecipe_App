/* eslint-disable import/extensions */
import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";
import rootReducer from "../modules";

const makeStore = () => createStore(rootReducer);
export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });
