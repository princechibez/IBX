import {
  applyMiddleware,
  combineReducers,
  createStore,
} from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import NewsReducer from "./newsReducer";
import BookmarkReducer from "./bookMarkReducer";

const combinedReducers = combineReducers({
  news: NewsReducer,
  bookmark: BookmarkReducer,
});

const composeEnhancers = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(combinedReducers, composeEnhancers);

export default store;
