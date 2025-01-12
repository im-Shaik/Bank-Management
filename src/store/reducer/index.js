import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { duplicate } from "./duplicate";

export const combineReducer = combineReducers({
  // add your reducers here
  loginReducer: userReducer,
  duplicates: duplicate,
});
