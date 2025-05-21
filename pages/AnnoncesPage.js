import React, { useState } from "react";
import AnnonceCard from "../components/Annonce/AnnonceCard";
import { backendURL } from "../public/URLs";

const AnnoncesPage = () => {
  // État pour les favoris et l'utilisateur
  const [favoris, setFavoris] = useState([]);
  const [user, setUser] = useState({ token: "token" });

  // Fonction pour gérer l'ajout et la suppression des favoris
  const handleToggleFavori = (annonce) => {
    const isFavori = favoris.some((e) => e._id === annonce._id);

    if (!isFavori) {
      // Ajouter l'annonce aux favoris
      setFavoris([...favoris, annonce]);
    } else {
      // Supprimer l'annonce des favoris
      setFavoris(favoris.filter((e) => e._id !== annonce._id));
    }
  };

  // Fonction pour gérer l'enregistrement des réservations
  const handleRegisterReservation = async (reservationData) => {
    const token = localStorage.getItem("token"); // Récupération du token stocké

    if (!token) {
      console.error("Token manquant, veuillez vous connecter.");
      return;
    }

    try {
      const response = await fetch(
        `${backendURL}/reservations/`,
        // "http://localhost:3000/reservations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Utilisation du token pour l'authentification
          },
          body: JSON.stringify(reservationData),
        }
      );

      const data = await response.json();
      if (!data.result) {
        console.error("Erreur lors de la réservation:", data.error);
      } else {
        console.log("Réservation réussie:", data);
      }
    } catch (error) {
      console.error("Erreur réseau ou autre:", error);
    }
  };

  return (
    <div>
      <AnnonceCard
        annonces={[]}
        likedAnnonce={favoris}
        addToFavorites={(annonce) => handleToggleFavori(annonce)}
        removeFromFavorites={(annonce) => handleToggleFavori(annonce)}
      />
    </div>
  );
};

export default AnnoncesPage;
