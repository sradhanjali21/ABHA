import { combineReducers } from "@reduxjs/toolkit";
import profileReducer from './slices/profileSlice';
import userReducer from "./slices/userSlice"; 
import numberReducer from "./slices/NumberSlice";
import personalDetailsReducer from "./slices/personalDetailsSlice";
import rootSlice, { resetState } from "./slices/rootSlice"; 

const appReducer = combineReducers({
  profile: profileReducer,
  user: userReducer,
  number: numberReducer,
  personalDetails: personalDetailsReducer,
  root: rootSlice, 
});

const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
