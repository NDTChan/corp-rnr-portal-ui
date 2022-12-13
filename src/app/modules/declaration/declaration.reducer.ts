import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  checkedNoHKID: false,
  checkedDisclaimer: false,
  checkedPrivacyStatement: false,
};

export const DeclarationSlice = createSlice({
  name: 'declaration',
  initialState,
  reducers: {
    setDisclaimer(state, action) {
      state.checkedDisclaimer = action.payload;
    },
    setNoHKID(state, action) {
      state.checkedNoHKID = action.payload;
    },
    setPrivacyStatement(state, action) {
      state.checkedPrivacyStatement = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { setDisclaimer, setNoHKID, setPrivacyStatement, reset } = DeclarationSlice.actions;

export default DeclarationSlice.reducer;
