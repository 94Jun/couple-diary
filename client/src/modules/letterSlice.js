import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedLetter: null,
  letterTrigger: false,
};

const letterSlice = createSlice({
  name: "letter",
  initialState,
  reducers: {
    SELECT_LETTER: (state, actions) => {
      state.selectedLetter = actions.payload;
    },
    ACTIVE_TRIGGER: (state, actions) => {
      state.letterTrigger = !state.letterTrigger;
    },
  },
});

export const letterActions = letterSlice.actions;
export default letterSlice.reducer;
