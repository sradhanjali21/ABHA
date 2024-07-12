import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; 
import NumberSlice from "./slices/NumberSlice";
import personalDetailsReducer from "./slices/personalDetailsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  number: NumberSlice,
  personalDetails: personalDetailsReducer,
});

export default rootReducer;
