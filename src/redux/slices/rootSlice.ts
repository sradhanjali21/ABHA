import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
  name: "root",
  initialState: {},
  reducers: {
    resetState: () => ({}),
  },
});

export const { resetState } = rootSlice.actions;
export default rootSlice.reducer;
// export default rootSlice;
