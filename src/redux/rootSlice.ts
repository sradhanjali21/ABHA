import { createSlice } from "@reduxjs/toolkit";
import personalDetailsReducer from "../redux/slices/personalDetailsSlice";
import userReducer from "../redux/slices/userSlice";
import NumberSlice from "./slices/NumberSlice";

const rootSlice = createSlice({
  name: "root",
  initialState: {},
  reducers: {
    resetState: () => ({}),
  },
});

export const { resetState } = rootSlice.actions;

export const rootReducer = (state, action) => {
  if (action.type === resetState.type) {
    return rootSlice.reducer(undefined, action);
  }
  return {
    personalDetails: personalDetailsReducer(state.personalDetails, action),
    user: userReducer(state.personalDetails, action),
    number: NumberSlice(state.personalDetails, action),
  };
};

export default rootReducer;
