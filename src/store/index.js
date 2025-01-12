import { createStore, applyMiddleware } from "redux";
import { combineReducer } from "./reducer";
import { thunk } from "redux-thunk";

export const store = createStore(combineReducer, applyMiddleware(thunk));
