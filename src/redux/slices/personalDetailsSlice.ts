
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalDetailsState {
  firstName: string;
  middleName: string;
  lastName: string;
  yearOfBirth: string;
  monthOfBirth: string;
  dayOfBirth: string;
  gender: string;
  phone: string;
  email: string;
  address: string;
  pincode: string;
  state: string;
  district: string;
}

const initialState: PersonalDetailsState = {
  firstName: '',
  middleName: '',
  lastName: '',
  yearOfBirth: '',
  monthOfBirth: '',
  dayOfBirth: '',
  gender: '',
  phone: '',
  email: '',
  address: '',
  pincode: '',
  state: '',
  district: '',
};

const personalDetailsSlice = createSlice({
  name: 'personalDetails',
  initialState,
  reducers: {
    setPersonalDetails: (state, action: PayloadAction<PersonalDetailsState>) => {
      return { ...state, ...action.payload };
    },
    resetPersonalDetails: () => initialState,
  },
});

export const { setPersonalDetails,resetPersonalDetails } = personalDetailsSlice.actions;
export default personalDetailsSlice.reducer;
