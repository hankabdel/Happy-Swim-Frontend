import { createSlice } from "@reduxjs/toolkit";

const mesRechercheSlice = createSlice({
  name: "mesRecherche",
  initialState: { value: [] },
  reducers: {
    addMesRecherche: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },
  },
});

export const { addMesRecherche } = mesRechercheSlice.actions;
export default mesRechercheSlice.reducer;
