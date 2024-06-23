// Importation de la fonction `createSlice` depuis le package "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit";

// Définition de l'état initial du slice avec un tableau vide pour stocker les annonces
const initialState = {
  value: [],
};

// Création du slice appelé "annonce"
export const annoncesSlice = createSlice({
  // Nom du slice
  name: "annonce",
  // État initial du slice
  initialState,
  // Définition des reducers pour le slice
  reducers: {
    // Reducer pour ajouter une annonce à l'état
    addAnnonce: (state, action) => {
      // Ajoute l'annonce (contenue dans action.payload) à la liste des annonces
      state.value.push(action.payload);
    },
    // Reducer pour supprimer une annonce de l'état
    removeAnnonce: (state, action) => {
      // Filtre les annonces pour enlever celle dont l'_id correspond à celui fourni dans action.payload

      // supprime une annonce spécifique de la liste en filtrant les annonces
      // qui n'ont pas le même _id que celui fourni dans action.payload
      state.value = state.value.filter(
        (annonce) => annonce._id !== action.payload._id
      );
    },
    // action.payload est l'objet envoyé avec l'action dispatchée.
    // Il contient les données nécessaires pour cette action,
    // y compris l'identifiant de l'annonce à supprimer.

    // Reducer pour supprimer toutes les annonces de l'état
    removeAllAnnonce: (state) => {
      // Réinitialise la liste des annonces à un tableau vide
      state.value = [];
    },
  },
});

// Exportation des actions générées automatiquement par createSlice
export const { addAnnonce, removeAnnonce, removeAllAnnonce } =
  annoncesSlice.actions;
// Exportation du reducer généré automatiquement par createSlice pour être utilisé dans le store
export default annoncesSlice.reducer;

// createSlice est une fonction de @reduxjs/toolkit qui facilite
// la création de slices Redux. Un slice représente un morceau
// de l'état global de l'application et les reducers qui modifient cet état.

// initialState est l'état par défaut du slice. Dans ce cas,
// il s'agit d'un objet avec une propriété value qui est un tableau vide.
//  Ce tableau stockera les annonces.

// Reducers :

// Les reducers sont des fonctions qui acceptent
// l'état actuel et une action, et retournent un nouvel état modifié.
