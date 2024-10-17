import React, { useState } from "react";
import Annonce from "../components/Annonce";

const AnnoncesPage = () => {
  // État pour les favoris et l'utilisateur
  const [favoris, setFavoris] = useState([]);
  const [user, setUser] = useState({ token: "token" });
  const backendURL = process.env.REACT_APP_BACKEND_URL;

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
  const handleRegisterReservation = (reservationData) => {
    // addReservation
    fetch(`${backendURL}/reservations/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`, // Passe le token utilisateur
      },
      body: JSON.stringify(reservationData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors de la réservation.");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réservation réussie:", data);
      })
      .catch((error) => {
        console.error("Erreur lors de la réservation:", error);
      });
  };

  return (
    <div>
      {/* Rendre le composant Annonce en passant les favoris, l'utilisateur et les fonctions */}
      <Annonce
        favoris={favoris}
        user={user}
        onToggleFavori={handleToggleFavori}
        onRegisterReservation={handleRegisterReservation}
      />
    </div>
  );
};

export default AnnoncesPage;
