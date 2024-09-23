import React, { useState } from "react";
import Annonce from "../components/Annonce";

const AnnoncesPage = () => {
  // État pour les favoris et l'utilisateur
  const [favoris, setFavoris] = useState([]);
  const [user, setUser] = useState({ token: "token" }); // Ici, vous devriez remplacer "token" par le token réel

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
    try {
      const response = await fetch(
        "http://localhost:3000/reservations/addReservation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },

          body: JSON.stringify(reservationData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de la réservation:", errorData);
        throw new Error("Erreur lors de la réservation.");
      }

      const data = await response.json();
      console.log("Réservation réussie:", data);
    } catch (error) {
      console.error("Erreur lors de la réservation:", error.message);
    }
  };

  return (
    <div>
      {/* Passer les favoris, l'utilisateur et les fonctions en props à Annonce */}
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
