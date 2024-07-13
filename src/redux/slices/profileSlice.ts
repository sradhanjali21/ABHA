import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileCreated: false, 
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    createProfile: (state) => {
      state.profileCreated = true;
    },
    resetProfile: (state) => {
      state.profileCreated = false;
    },
  },
});

export const { createProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
