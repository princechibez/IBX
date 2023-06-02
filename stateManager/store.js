import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import NewsReducer from "./reducer";

const combinedReducers = combineReducers({
  news: NewsReducer,
});

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(combinedReducers, composeEnhancers);

export default store;
