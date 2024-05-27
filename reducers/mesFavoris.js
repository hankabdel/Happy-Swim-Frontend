import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const mesFavorisSlice = createSlice({
  name: "mesFavoris",
  initialState,
  reducers: {
    addMesFavoris: (state, action) => {
      state.value.push(action.payload);
    },
    removeMesFavoris: (state, action) => {
      state.value = state.value.filter(
        (mesFavoris) => mesFavoris._id !== action.payload._id
      );
    },
  },
});

export const { addMesFavoris, removeMesFavoris } = mesFavorisSlice.actions;
export default mesFavorisSlice.reducer;
