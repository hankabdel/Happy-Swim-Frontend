import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: { nom: null, prenom: null, token: null, email: null },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.token = action.payload.token;
      state.value.nom = action.payload.nom;
      state.value.prenom = action.payload.prenom;
      state.value.email = action.payload.email;
    },
    logout: (state) => {
      state.value.token = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.email = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
