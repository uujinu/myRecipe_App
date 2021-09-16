/* eslint-disable import/extensions */
import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension"
import combinedReducers, { persistConfig } from "../modules";
import { persistStore, persistReducer } from "redux-persist";


const enhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
// persistConfig
const makeStore = () => {
  const persistedReducer = persistReducer(persistConfig, combinedReducers);
  const store = createStore(
      persistedReducer,
      enhancer
  );

  store.__persistor = persistStore(store);
  return store;
}

export const store = makeStore();
export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV === 'development' });
