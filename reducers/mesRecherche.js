import { createSlice } from "@reduxjs/toolkit";

const mesRechercheSlice = createSlice({
  name: "mesRecherche",
  initialState: { value: [] },
  reducers: {
    addMesRecherche: (state, action) => {
      state.value = [...state.value, ...action.payload];
    },
    resetMesRecherche: (state) => {
      state.value = []; // Réinitialise les recherches
    },
  },
});

export const { addMesRecherche, resetMesRecherche } = mesRechercheSlice.actions;
export default mesRechercheSlice.reducer;
