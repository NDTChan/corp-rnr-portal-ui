import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  docType: 'passport',
};

export const PersonalSlice = createSlice({
  name: 'personal',
  initialState,
  reducers: {
    selectDocType(state, action) {
      state.docType = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { selectDocType, reset } = PersonalSlice.actions;

export default PersonalSlice.reducer;
