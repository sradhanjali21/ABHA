import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NumberState {
  phoneNumber: string;
}

const initialState: NumberState = {
  phoneNumber: "",
};

const numberSlice = createSlice({
  name: "phoneNumber",
  initialState,
  reducers: {
    setPhoneNumber(state, action: PayloadAction<string>) {
      state.phoneNumber = action.payload;
    },
    resetPhoneNumber(state) {
      state.phoneNumber = ""; 
    },
  },
});

export const { setPhoneNumber,resetPhoneNumber } = numberSlice.actions;
export default numberSlice.reducer;
