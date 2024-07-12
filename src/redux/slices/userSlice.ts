import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  abhaAddress: string;
  password: string;
}

const initialState: UserState = {
  abhaAddress: '',
  password: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAbhaAddress(state, action: PayloadAction<string>) {
      state.abhaAddress = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    resetUserState(state) {
      state.abhaAddress = '';
      state.password = '';
    },
  },
});

export const { setAbhaAddress, setPassword, resetUserState } = userSlice.actions;
export default userSlice.reducer;
