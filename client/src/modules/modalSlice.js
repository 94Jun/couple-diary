import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeModal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    OPEN_MODAL: (state, actions) => {
      state.activeModal = actions.payload;
    },
    CLOSE_MODAL: (state, actions) => {
      state.activeModal = null;
    },
  },
});

export const modalActions = modalSlice.actions;
export default modalSlice.reducer;
