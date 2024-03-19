import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
import { blogReducer } from "@reducers/blogReducer";
import { authReducer } from "@reducers/authReducer";
import searchReducer from "@reducers/searchReducer";
import filterReducer from "@reducers/filterReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  search: searchReducer,
  filter: filterReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
