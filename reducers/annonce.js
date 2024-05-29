import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const annoncesSlice = createSlice({
  name: "annonce",
  initialState,
  reducers: {
    addAnnonce: (state, action) => {
      state.value.push(action.payload);
    },
    removeAnnonce: (state, action) => {
      state.value = state.value.filter(
        (annonce) => annonce._id !== action.payload._id
      );
    },
    removeAllAnnonce: (state) => {
      state.value = [];
    },
  },
});

export const { addAnnonce, removeAnnonce, removeAllAnnonce } =
  annoncesSlice.actions;
export default annoncesSlice.reducer;
